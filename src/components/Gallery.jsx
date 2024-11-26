import React from "react";

const Gallery = () => {
  const authors = [
    {
      name: "J.K. Rowling",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg",
      bio: "British author, best known for the Harry Potter series.",
      books: ["Harry Potter", "Fantastic Beasts"],
    },
    {
      name: "George R.R. Martin",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/16/George_R._R._Martin_by_Gage_Skidmore_2.jpg",
      bio: "American novelist and short-story writer, author of Game of Thrones.",
      books: ["A Game of Thrones", "Fire & Blood"],
    },
    {
      name: "Agatha Christie",
      image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcS8YrxibIKRyLl9ISZdC0K9rH4mRVkjKUG0uvqTeIYwXxw0q9AZNv_8SMBDDpRwxy5sohgkM4g-IzL_G8c",
      bio: "Famous for her detective novels featuring Hercule Poirot and Miss Marple.",
      books: ["Murder on the Orient Express", "The ABC Murders"],
    },
    {
      name: "J.R.R. Tolkien",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSFtKbOqocG4owlnIydBxkIvGPvl21brANjW-UyjZxFX9If_Y_GcbAMyXD0YqtDCVdSWEFhbY0zVuZLLwrx-F7TmQ",
      bio: "English writer, poet, and philologist, author of The Lord of the Rings.",
      books: ["The Hobbit", "The Lord of the Rings"],
    },
    {
      name: "Stephen King",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg",
      bio: "American author of horror, supernatural fiction, and suspense.",
      books: ["The Shining", "It"],
    },
    {
      name: "Jane Austen",
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTumFtyTl8aU7YueE9RG11lj1GDxJXf4BjLm-4Iznkm5-7hyQv3foGINzhUZkuDNrPSSwXTyHJNzmIWTjYFImKGuA",
      bio: "Known for her romantic novels, including Pride and Prejudice.",
      books: ["Pride and Prejudice", "Emma"],
    },
    {
      name: "Mark Twain",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mark_Twain_by_AF_Bradley.jpg",
      bio: "Famous for his novels about Tom Sawyer and Huckleberry Finn.",
      books: ["The Adventures of Tom Sawyer", "Adventures of Huckleberry Finn"],
    },
    {
      name: "Virginia Woolf",
      image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRSFS3__u54Rma_JVg555XzGTVkWtBL7u5p-FUqACvCKHOOG9ITjkjEeSEViRz3mxELpt5JhHZhU-Tf_lo",
      bio: "English writer, considered one of the most important modernist authors.",
      books: ["To the Lighthouse", "Mrs. Dalloway"],
    },
    {
      name: "Ernest Hemingway",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS87Cm6YEndww5SQwkKzvG7tDviGTokkMawFczeJYEODOJLJRyN",
      bio: "American novelist and short-story writer, known for The Old Man and the Sea.",
      books: ["The Old Man and the Sea", "A Farewell to Arms"],
    },
    {
      name: "F. Scott Fitzgerald",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQz_g8YsVrcxxZqpyEWUnjgasSLFNRkHfWmXaRNoimJ6gZQ7ya84VoHZ9qHZWK-gz2fAqWU_FUtGQPukzxSjlWn6g",
      bio: "American novelist, author of The Great Gatsby.",
      books: ["The Great Gatsby", "Tender Is the Night"],
    },
  ];
  return (
    <div className="relative w-full max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-4">Famous Authors</h2>
      <hr className="border-gray-300 mb-6" />
      <div
        className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {authors.map((author, index) => (
          <div
            key={index}
            className="min-w-[250px] md:min-w-[300px] flex-shrink-0 snap-start relative overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={author.image}
              alt={author.name}
              className="w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              style={{ height: "300px" }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
              <a
                href={`https://www.google.com/search?q=${author.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-white hover:underline"
              >
                {author.name}
              </a>
              <p className="text-sm text-gray-300">{author.bio}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center mt-4 text-gray-500">Swipe for more...www</p>
    </div>
  );
};

export default Gallery;
