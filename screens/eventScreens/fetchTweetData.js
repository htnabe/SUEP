import * as Sentry from 'sentry-expo';
import 'dotenv/config';

const fetchTweetData = async (sheetName) => {
  try {
    let data = [];
    if (sheetName == 'Clubs') {
      data = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/' +
          process.env.CLUB_SPREADSHEET_ID +
          '/values/' +
          sheetName +
          '?valueRenderOption=FORMATTED_VALUE&fields=values&key=' +
          process.env.GOOGLE_SPREADSHEET_API_KEY
      );
    } else if (sheetName == 'Community') {
      data = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/' +
          process.env.COMMUNITY_SPREADSHEET_ID +
          '/values/' +
          sheetName +
          '?valueRenderOption=FORMATTED_VALUE&fields=values&key=' +
          process.env.GOOGLE_SPREADSHEET_API_KEY
      );
    } else {
      data = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/' +
          process.env.UNIVERSITY_SPREADSHEET_ID +
          '/values/' +
          sheetName +
          '?valueRenderOption=FORMATTED_VALUE&fields=values&key=' +
          process.env.GOOGLE_SPREADSHEET_API_KEY
      );
    }
    let { values } = await data.json();
    let [, ...Data] = values.map((data) => data);
    return Data;
  } catch (error) {
    Sentry.Native.captureException(error);
  }
};

export default fetchTweetData;
