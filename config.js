// 環境変数の設定
const config = {
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || ''
  },
  timetree: {
    apiKey: process.env.TIMETREE_API_KEY || '',
    calendarId: process.env.TIMETREE_CALENDAR_ID || ''
  },
  env: process.env.NODE_ENV || 'development'
};

// 開発環境での警告
if (config.env === 'development') {
  if (!config.supabase.url || !config.supabase.anonKey) {
    console.warn('警告: Supabaseの設定が不完全です。.envファイルを確認してください。');
  }
  if (!config.timetree.apiKey || !config.timetree.calendarId) {
    console.warn('警告: TimeTreeの設定が不完全です。.envファイルを確認してください。');
  }
}

export default config;