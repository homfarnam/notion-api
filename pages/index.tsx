import Layout from "../components/Layout";
import { Client } from "@notionhq/client";

export default function IndexPage({ books }: any): JSX.Element {
  console.log("books: ", books);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="flex w-full justify-center my-10 text-4xl">
        <h1>Hello Notion 👋</h1>
      </div>
      <main>
        <div className="w-auto flex justify-center py-10">
          {books?.map(
            (book: {
              id: string;
              properties: {
                Name: { title: any };
                Author: { rich_text: any[] };
              };
            }) => {
              return (
                <div
                  key={book.id}
                  className="border p-[100px] border-black rounded-2xl"
                >
                  <a href="">
                    <h2>{book?.properties?.Name?.title[0]?.plain_text}</h2>
                    <p>{book?.properties?.Author?.rich_text[0]?.plain_text}</p>
                  </a>
                </div>
              );
            }
          )}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  return {
    props: {
      books: response.results,
    },
  };
}
