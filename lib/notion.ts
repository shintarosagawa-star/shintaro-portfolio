import { Client } from "@notionhq/client";

export type NotionPost = {
  id: string;
  title: string;
  date: string;
  tags: string[];
};

/**
 * Notion APIから記事一覧を取得する。
 * .env.local に NOTION_API_KEY と NOTION_DATABASE_ID を設定してください。
 *
 * Notionデータベースのプロパティ:
 * - タイトル（title型）: 記事タイトル
 * - 日付（date型）: 公開日
 * - タグ（multi_select型）: カテゴリ
 * - 公開（checkbox型）: trueの記事のみ表示
 */
export async function getNotionPosts(): Promise<NotionPost[]> {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId || apiKey === "xxx" || databaseId === "xxx") {
    return [];
  }

  const notion = new Client({ auth: apiKey });

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "公開",
      checkbox: { equals: true },
    },
    sorts: [{ property: "日付", direction: "descending" }],
  });

  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties["タイトル"]?.title?.[0]?.plain_text ?? "無題",
    date: page.properties["日付"]?.date?.start ?? "",
    tags:
      page.properties["タグ"]?.multi_select?.map((t: any) => t.name) ?? [],
  }));
}
