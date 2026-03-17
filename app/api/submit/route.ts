import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // We added "age" to the destructured variables here
    const { submission_type, full_name, age, occupation, city, province, date_of_death, notes, submitter_email } = body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ auth, version: 'v4' });
    const locationString = [city, province].filter(Boolean).join(" ");

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            full_name,                  // Column A: نام کامل
            age ? `${age} ساله` : "",     // Column B: سن (Adds "ساله" to match your Excel format!)
            locationString,             // Column C: محل 
            date_of_death,              // Column D: تاریخ فوت
            occupation,                 // Column E: شغل
            "",                         // Column F: نقش در خانواده
            notes,                      // Column G: سایر جزئیات
            "User Submission",          // Column H: منبع
            new Date().toISOString(),   // Column I: Timestamp
            submission_type,            // Column J: Type
            submitter_email             // Column K: Email
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sheets API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to save submission" }, { status: 500 });
  }
}