import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import pkg from "iran-cities-json";

const { ostan, shahr } = pkg;

// Read the fallback JSON dynamically using fs and path
const FALLBACK_FILE_PATH = path.resolve("data-source", "fallback_cities.json");
const fallbackData = JSON.parse(fs.readFileSync(FALLBACK_FILE_PATH, "utf-8"));

// Upgraded normalizer to handle Persian half-spaces (ZWNJ) and commas
function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // Removes zero-width non-joiners (نیم‌فاصله)
    .replace(/\s+/g, " ")
    .replace(/[،,]/g, "");
}

function makeMatchKey(value) {
  // Removes ALL spaces for behind-the-scenes matching
  return normalizeText(value).replace(/\s+/g, "");
}

const provinceIdToPersian = new Map(
  ostan.map((p) => [String(p.id), p.name])
);

const persianCityToProvincePersian = new Map();
const displayCityNames = new Map(); // Saves the correct spacing for the final output

// 1. Load data from iran-cities-json
for (const city of shahr) {
  const provinceName = provinceIdToPersian.get(String(city.ostan));
  if (city.name && provinceName) {
    const matchKey = makeMatchKey(city.name);
    persianCityToProvincePersian.set(matchKey, normalizeText(provinceName));
    displayCityNames.set(matchKey, normalizeText(city.name)); 
  }
}

// 2. Merge data from your fallback file
for (const provObj of fallbackData) {
  const provName = normalizeText(provObj.province);
  for (const cityName of provObj.cities) {
    const matchKey = makeMatchKey(cityName);
    persianCityToProvincePersian.set(matchKey, provName);
    displayCityNames.set(matchKey, normalizeText(cityName)); 
  }
}

// 3. Create an array of known spaceless cities sorted by length
const sortedKnownCities = Array.from(persianCityToProvincePersian.keys()).sort((a, b) => b.length - a.length);

// 4. Create a Set of known province names (these keep their spaces)
const knownPersianProvinces = new Set(persianCityToProvincePersian.values());

const englishToPersianCity = {
  "rasht": "رشت",
  "karaj": "کرج",
  "fardis": "فردیس",
  "tehran": "تهران",
  "narmak": "نارمک",
  "shiraz": "شیراز",
  "arak": "اراک",
  "sari": "ساری",
  "sabzevar": "سبزوار",
  "gorgan": "گرگان",
  "amol": "آمل",
  "ramsar": "رامسر",
  "shahroud": "شاهرود",
  "kish": "کیش",
  "qeshm": "قشم",
  "islamabad-e gharb": "اسلام آبادغرب",
  "sanandaj": "سنندج",
  "falavarjan": "فلاورجان",
  "miandoab": "میاندوآب",
  "rostamkola": "رستمکلا"
};

const persianProvinceToEnglish = {
  "آذربایجان شرقی": "East Azerbaijan",
  "آذربایجان غربی": "West Azerbaijan",
  "اردبیل": "Ardabil",
  "اصفهان": "Isfahan",
  "البرز": "Alborz",
  "ایلام": "Ilam",
  "بوشهر": "Bushehr",
  "تهران": "Tehran",
  "چهارمحال وبختیاری": "Chaharmahal and Bakhtiari",
  "خراسان جنوبی": "South Khorasan",
  "خراسان رضوی": "Razavi Khorasan",
  "خراسان شمالی": "North Khorasan",
  "خوزستان": "Khuzestan",
  "زنجان": "Zanjan",
  "سمنان": "Semnan",
  "سیستان وبلوچستان": "Sistan and Baluchestan",
  "فارس": "Fars",
  "قزوین": "Qazvin",
  "قم": "Qom",
  "کردستان": "Kurdistan",
  "کرمان": "Kerman",
  "کرمانشاه": "Kermanshah",
  "کهگیلویه وبویراحمد": "Kohgiluyeh and Boyer-Ahmad",
  "گلستان": "Golestan",
  "گیلان": "Gilan",
  "لرستان": "Lorestan",
  "مازندران": "Mazandaran",
  "مرکزی": "Markazi",
  "هرمزگان": "Hormozgan",
  "همدان": "Hamadan",
  "یزد": "Yazd"
};

const DATA_SOURCE_DIR = path.resolve("data-source");
const OUTPUT_FILE = path.resolve("data", "victims.json");
const SHEET_NAME = null; // leave null to use first sheet

const knownProvinceSlugs = new Set([
  "west-azerbaijan",
  "east-azerbaijan",
  "ardabil",
  "gilan",
  "zanjan",
  "qazvin",
  "alborz",
  "tehran",
  "qom",
  "mazandaran",
  "golestan",
  "north-khorasan",
  "razavi-khorasan",
  "south-khorasan",
  "semnan",
  "isfahan",
  "yazd",
  "kerman",
  "sistan-and-baluchestan",
  "fars",
  "bushehr",
  "hormozgan",
  "khuzestan",
  "chaharmahal-and-bakhtiari",
  "kohgiluyeh-and-boyer-ahmad",
  "lorestan",
  "ilam",
  "kermanshah",
  "kurdistan",
  "hamadan",
  "markazi"
]);

function provinceToSlug(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");
}

function normalizeProvinceName(value) {
  const cleaned = cleanString(value);
  if (!cleaned) return null;

  const provinceSlug = provinceToSlug(cleaned);

  const slugToProvinceName = {
    "west-azerbaijan": "West Azerbaijan",
    "east-azerbaijan": "East Azerbaijan",
    "ardabil": "Ardabil",
    "gilan": "Gilan",
    "zanjan": "Zanjan",
    "qazvin": "Qazvin",
    "alborz": "Alborz",
    "tehran": "Tehran",
    "qom": "Qom",
    "mazandaran": "Mazandaran",
    "golestan": "Golestan",
    "north-khorasan": "North Khorasan",
    "razavi-khorasan": "Razavi Khorasan",
    "south-khorasan": "South Khorasan",
    "semnan": "Semnan",
    "isfahan": "Isfahan",
    "yazd": "Yazd",
    "kerman": "Kerman",
    "sistan-and-baluchestan": "Sistan and Baluchestan",
    "fars": "Fars",
    "bushehr": "Bushehr",
    "hormozgan": "Hormozgan",
    "khuzestan": "Khuzestan",
    "chaharmahal-and-bakhtiari": "Chaharmahal and Bakhtiari",
    "kohgiluyeh-and-boyer-ahmad": "Kohgiluyeh and Boyer-Ahmad",
    "lorestan": "Lorestan",
    "ilam": "Ilam",
    "kermanshah": "Kermanshah",
    "kurdistan": "Kurdistan",
    "hamadan": "Hamadan",
    "markazi": "Markazi",
  };

  return slugToProvinceName[provinceSlug] || cleaned;
}

function slugify(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function makeUniqueSlug(baseSlug, id, usedSlugs) {
  let slug = baseSlug;

  if (!usedSlugs.has(slug)) {
    usedSlugs.add(slug);
    return slug;
  }

  slug = `${baseSlug}-${id}`;

  if (!usedSlugs.has(slug)) {
    usedSlugs.add(slug);
    return slug;
  }

  let counter = 2;
  while (usedSlugs.has(`${slug}-${counter}`)) {
    counter += 1;
  }

  const finalSlug = `${slug}-${counter}`;
  usedSlugs.add(finalSlug);
  return finalSlug;
}

function cleanString(value) {
  if (value === undefined || value === null) return null;
  const s = String(value).trim();
  if (!s) return null;
  if (s.toLowerCase() === "not specified") return null;
  return s;
}

function cleanAge(value) {
  const s = cleanString(value);
  if (!s) return null;
  const n = Number(s);
  return Number.isNaN(n) ? null : n;
}

function requiredString(value, fieldName, rowIndex) {
  const cleaned = cleanString(value);
  if (!cleaned) {
    throw new Error(`Row ${rowIndex}: missing required field "${fieldName}"`);
  }
  return cleaned;
}

function getValue(row, possibleHeaders) {
  for (const header of possibleHeaders) {
    if (row[header] !== undefined) return row[header];
  }
  return undefined;
}

function isMeaningfulRow(row) {
  const fullName = cleanString(getValue(row, ["نام کامل", "Full Name", "full name", "Name", "name"]));
  return Boolean(fullName);
}


function convertPersianToEnglishNumbers(str) {
  if (!str) return str;
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  for (let i = 0; i < 10; i++) {
    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
  }
  return str;
}

function extractAge(value) {
  const s = cleanString(value);
  if (!s) return null;
  // Convert Persian/Arabic numerals to English
  const englishNumStr = convertPersianToEnglishNumbers(s);
  // Strip out all non-digit characters (like "ساله")
  const numOnly = englishNumStr.replace(/\D/g, "");
  const n = parseInt(numOnly, 10);
  return Number.isNaN(n) ? null : n;
}

function extractLocationData(rawLocation) {
  if (!rawLocation) return { city: null, province: null, matchedBy: "unmatched" };

  const normalizedLoc = normalizeText(rawLocation);
  const searchKey = makeMatchKey(rawLocation); // e.g., "مسجدسلیمان"

  // A. Try an exact spaceless match first (Solves Bug 1)
  if (persianCityToProvincePersian.has(searchKey)) {
    return {
      city: displayCityNames.get(searchKey), // Returns nicely formatted name
      province: persianCityToProvincePersian.get(searchKey),
      matchedBy: "exact-city-match"
    };
  }

  // B. Two-Way Substring Scanning
  let bestCityMatchKey = null;
  let bestProvMatch = null;

  for (const cityKey of sortedKnownCities) {
    // Check 1: Excel text contains dictionary city (e.g., "نارمک تهران" contains "تهران")
    if (cityKey.length > 2 && searchKey.includes(cityKey)) {
      bestCityMatchKey = cityKey;
      bestProvMatch = persianCityToProvincePersian.get(cityKey);
      break;
    }

    // Check 2: Dictionary city contains Excel text (Solves Bug 2: "بندرماهشهر" contains "ماهشهر")
    // Require >3 chars so short words don't accidentally match long cities
    if (searchKey.length > 3 && cityKey.includes(searchKey)) {
      bestCityMatchKey = cityKey;
      bestProvMatch = persianCityToProvincePersian.get(cityKey);
      break;
    }
  }

  // C. Substring scanning for Province
  let explicitProvMatch = null;
  for (const prov of knownPersianProvinces) {
    if (normalizedLoc.includes(prov)) {
      explicitProvMatch = prov;
      break;
    }
  }

  // Determine final results
  if (bestCityMatchKey) {
    return {
      city: displayCityNames.get(bestCityMatchKey), // Pulls the official spaced name
      province: explicitProvMatch || bestProvMatch, 
      matchedBy: "substring-city-match"
    };
  }

  if (explicitProvMatch) {
    return {
      city: rawLocation,
      province: explicitProvMatch,
      matchedBy: "substring-province-match"
    };
  }

  return { city: rawLocation, province: null, matchedBy: "unmatched" };
}

// ✅ REPLACE YOUR EXISTING buildVictim WITH THIS:
function buildVictim(row, rowIndex, usedSlugs) {
  // 1. Auto-generate ID
  const id = String(rowIndex);

  // 2. Fetch Full Name
  const full_name = requiredString(
    getValue(row, ["نام کامل", "Full Name"]),
    "نام کامل",
    rowIndex
  );

  // 3. Extract Age
  const rawAge = getValue(row, ["سن", "Age"]);
  const age = extractAge(rawAge);

  // 4. Fetch Date
  const date_of_death = cleanString(
    getValue(row, ["تاریخ فوت", "Date of Death"])
  );

  // 5. Fetch Direct Columns (Now much simpler!)
  const occupation = cleanLLMField(getValue(row, ["شغل", "Occupation"]));
  const family_role = cleanLLMField(getValue(row, ["نقش در خانواده", "Family Role"]));
  
  // Clean the bio to remove the "جاویدنام" clutter
  const rawDetails = getValue(row, ["سایر جزئیات", "Other Details"]);
  const short_bio = cleanBio(rawDetails);

  // 6. Handle Location
  // Note: Added "محل" since your new column header is "محل" instead of "مکان"
  const locationRaw = getValue(row, ["محل", "مکان", "Location"]); 
  const locationData = extractLocationData(locationRaw);
  
  let province = null;
  if (locationData.province) {
      const provinceEnglish = persianProvinceToEnglish[locationData.province] || locationData.province;
      province = normalizeProvinceName(provinceEnglish);
  }

  return {
    id,
    slug: makeUniqueSlug(slugify(full_name), id, usedSlugs),
    full_name,
    age,
    city: locationData.city,
    province,
    occupation: occupation, 
    family_role: family_role, 
    date_of_death,
    protest_wave: "2026",
    short_bio: short_bio || "",
    source_type: "spreadsheet_import",
    // ⬇️ UPDATE THIS to show exactly which Excel file this person came from!
    source_title: row._sourceFileName || "Unknown spreadsheet", 
    source_url: "",
    verification_status: "source-reported",
    _debug_location: locationRaw,
    _debug_match_method: locationData.matchedBy,
  };
}

// ✅ ADD THESE HELPER FUNCTIONS:

// Handles LLM fields to return null instead of "Not in source"
function cleanLLMField(text) {
  const s = cleanString(text);
  if (!s || s.toLowerCase() === "not in source" || s === "نامشخص") return null;
  return s;
}

// Cleans up the 'Other Details' column to drop useless honorifics
function cleanBio(text) {
  let s = cleanLLMField(text);
  if (!s) return null;

  // List of phrases you want to completely erase from the Details column
  const honorificsToRemove = [
    "جاویدنام، فرزند ایران و جان‌فدای میهن",
    "جاویدنام، جان‌فدا در",
    "جاویدنام، جان‌فدا",
    "جاویدنام",
    "فرزند ایران",
    "جان‌فدای میهن"
  ];

  for (const honorific of honorificsToRemove) {
    // Globally replace these terms with nothing
    s = s.replace(new RegExp(honorific, 'g'), "");
  }

  // Clean up any stray commas or spaces left behind (e.g., if a string was "جاویدنام، کشته شد" -> "، کشته شد")
  s = s.replace(/^[،,\s]+|[،,\s]+$/g, "").trim();

  return s.length > 0 ? s : null;
}

function checkDuplicates(victims) {
  const seenIds = new Set();
  const seenSlugs = new Set();

  for (const victim of victims) {
    if (seenIds.has(victim.id)) {
      throw new Error(`Duplicate id found: ${victim.id}`);
    }
    seenIds.add(victim.id);

    if (seenSlugs.has(victim.slug)) {
      console.warn(`Warning: duplicate slug found: ${victim.slug}`);
    }
    seenSlugs.add(victim.slug);
  }
}

function main() {
  if (!fs.existsSync(DATA_SOURCE_DIR)) {
    throw new Error(`Data source directory not found: ${DATA_SOURCE_DIR}`);
  }

  // 1. Get all files in the directory
  const files = fs.readdirSync(DATA_SOURCE_DIR);
  
  // 2. Filter for valid Excel files (ignore ~lock or hidden files)
  const excelFiles = files.filter(file => {
    return file.endsWith(".xlsx") && !file.startsWith("~") && !file.startsWith(".~lock");
  });

  if (excelFiles.length === 0) {
    throw new Error(`No valid .xlsx files found in ${DATA_SOURCE_DIR}`);
  }

  let allRows = [];
  let globalRowCounter = 1;

  // 3. Loop through each file and extract rows
  for (const file of excelFiles) {
    const filePath = path.join(DATA_SOURCE_DIR, file);
    console.log(`Reading: ${file}...`);
    
    const workbook = xlsx.readFile(filePath);
    const sheetName = SHEET_NAME || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      console.warn(`⚠️ Skipped ${file}: Sheet not found.`);
      continue;
    }

    const rows = xlsx.utils.sheet_to_json(worksheet, {
      defval: "",
      raw: false,
    });

    // Tag each row with a unique global ID and its source filename
    for (const row of rows) {
      globalRowCounter++;
      row._globalId = String(globalRowCounter);
      row._sourceFileName = file;
      allRows.push(row);
    }
  }

  console.log(`\nSuccessfully loaded ${allRows.length} total rows from ${excelFiles.length} files.`);

  // 4. Process the combined rows
  const usedSlugs = new Set();
  const filteredRows = allRows.filter(isMeaningfulRow);

  // Map using the pre-assigned global ID instead of the array index
  const victims = filteredRows.map((row) =>
    buildVictim(row, row._globalId, usedSlugs)
  );

  // --- The reporting logic below remains exactly the same ---
  const matchedVictims = [];
  const unmatchedVictims = [];
  const provinceCounts = new Map();

  for (const victim of victims) {
    const provinceSlug = victim.province ? provinceToSlug(victim.province) : null;

    if (provinceSlug && knownProvinceSlugs.has(provinceSlug)) {
      matchedVictims.push(victim);
      provinceCounts.set(
        provinceSlug,
        (provinceCounts.get(provinceSlug) ?? 0) + 1
      );
    } else {
      unmatchedVictims.push(victim);
    }
  }

  console.log("\n=== Import Report ===");
  console.log(`Total meaningful victims processed: ${victims.length}`);
  console.log(`Matched to known provinces: ${matchedVictims.length}`);
  console.log(`Unmatched province rows: ${unmatchedVictims.length}`);

  console.log("\n=== Province Counts ===");
  for (const [provinceSlug, count] of [...provinceCounts.entries()].sort()) {
    console.log(`${provinceSlug}: ${count}`);
  }

  if (unmatchedVictims.length > 0) {
    console.log("\n=== Unmatched Rows ===");
    unmatchedVictims.slice(0, 50).forEach((victim) => {
      console.log(
        `ID ${victim.id} | ${victim.full_name} | location="${victim._debug_location}" | matchedBy=${victim._debug_match_method} | file=${victim.source_title}`
      );
    });

    if (unmatchedVictims.length > 50) {
      console.log(`...and ${unmatchedVictims.length - 50} more unmatched rows`);
    }
  }

  checkDuplicates(victims);

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(victims, null, 2), "utf-8");

  console.log(`\n✅ Built ${victims.length} victim records.`);
  console.log(`✅ Saved to: ${OUTPUT_FILE}`);
}

try {
  main();
} catch (error) {
  console.error("Build failed:");
  console.error(error.message);
  process.exit(1);
}