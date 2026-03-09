import { getNotionPosts, type NotionPost } from "@/lib/notion";

export default async function Blog() {
  let posts: NotionPost[] = [];
  try {
    posts = await getNotionPosts();
  } catch {
    // Notion未設定の場合は空で表示
  }

  return (
    <section id="blog" className="bg-[--color-off-white] px-6 md:px-13 py-24">
      <div className="flex items-center gap-3.5 text-[10px] font-bold tracking-[4px] uppercase text-[--color-blue] mb-5">
        Blog
        <span className="w-9 h-[1.5px] bg-[--color-blue]" />
      </div>
      <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.15] text-[--color-black] mb-18">
        思考の記録。
      </h2>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-8 border border-[--color-light-gray] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-[--color-mid-gray] mb-3">
                {post.date}
              </div>
              <h3 className="text-base font-extrabold text-[--color-black] mb-2 leading-snug">
                {post.title}
              </h3>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold tracking-[1px] px-2.5 py-1 bg-[--color-blue-light] text-[--color-blue]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[--color-mid-gray] text-sm font-light">
            準備中です。近日公開予定。
          </p>
        </div>
      )}
    </section>
  );
}
