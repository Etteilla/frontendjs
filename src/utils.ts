// export type EtteillaData = {
//   id: string;
//   name: string;
//   title: string;
//   url: string;
//   images?: {
//     base: string;
//     webp: string;
//     avif: string;
//     jpeg: string;
//   };
//   decks: number;
// };

export async function fetchEtteillaData<T>(url: string): Promise<Array<T>> {
  const response = await fetch(url, {
    method: 'GET',
  });

  const {data} = await response.json();
  return data;
}
