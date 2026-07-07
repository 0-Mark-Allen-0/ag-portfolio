export type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  summary: string;
};

export const toRead: Book[] = [
  {
    id: "tr1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "/images/book-covers/to-kill-a-mockingbird.png",
    summary: "A young girl grows up in the American South as her lawyer father defends a Black man falsely accused of rape, exposing the town's deep-rooted racial prejudice.",
  },
  {
    id: "tr2",
    title: "The Iliad",
    author: "Homer",
    coverUrl: "/images/book-covers/the-iliad.png",
    summary: "An ancient epic poem chronicling the final weeks of the Trojan War, focusing heavily on the fierce pride, rage, and tragic battles of the Greek warrior Achilles.",
  },
  {
    id: "tr3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "/images/book-covers/pride-and-prejudice.png",
    summary: "Sparks fly and societal expectations clash when the witty, independent Elizabeth Bennet and the wealthy, arrogant Mr. Darcy must overcome their personal biases to find love.",
  },
  {
    id: "tr4",
    title: "The God of Small Things",
    author: "Arundhati Roy",
    coverUrl: "/images/book-covers/the-god-of-small-things.png",
    summary: "Fraternal twins in Kerala, India, find their lives and family irrevocably shattered after a series of tragic events shifts their world in 1969.",
  },
  {
    id: "tr5",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    coverUrl: "/images/book-covers/mans-search-for-meaning.png",
    summary: "A psychiatrist chronicles his harrowing experiences surviving Nazi concentration camps, arguing that human drive is not powered by pleasure, but by the pursuit of what we find meaningful.",
  },
  {
    id: "tr6",
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    coverUrl: "/images/book-covers/beyond-good-and-evil.png",
    summary: "A philosophical critique of traditional morality that challenges the concepts of objective good and evil, urging free spirits to move past dogmatic thinking.",
  },
  {
    id: "tr7",
    title: "The Prince",
    author: "Niccolò Machiavelli",
    coverUrl: "/images/book-covers/the-prince.png",
    summary: "A classic political treatise that serves as a pragmatic guide for rulers on how to acquire, maintain, and wield power, famously suggesting that the end justifies the means.",
  },
  {
    id: "tr8",
    title: "The Authenticity Protocol",
    author: "Varun Agarwal",
    coverUrl: "/images/book-covers/the-authenticity-protocol.png",
    summary: "A modern exploration of navigating societal expectations and professional landscapes, focusing on the importance of staying true to oneself in an automated or superficial world.",
  },
  {
    id: "tr9",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    coverUrl: "/images/book-covers/fahrenheit-451.png",
    summary: "In a dystopian future where books are outlawed and \"firemen\" burn them, Guy Montag begins to question his job and his society after discovering the power of literature.",
  },
  {
    id: "tr10",
    title: "Skin in the Game",
    author: "Nassim Nicholas Taleb",
    coverUrl: "/images/book-covers/skin-in-the-game.png",
    summary: "A philosophical and practical look at risk management, arguing that people must share in the downsides of their decisions rather than insulating themselves from consequences.",
  },
  {
    id: "tr11",
    title: "Artificial Intelligence and Games",
    author: "Yannakakis and Togelius",
    coverUrl: "/images/book-covers/artificial-intelligence-and-games.png",
    summary: "An academic and practical textbook that explores how AI algorithms can be used to play, design, and model player experiences within video games.",
  },
  {
    id: "tr12",
    title: "The Book Thief",
    author: "Markus Zusak",
    coverUrl: "/images/book-covers/the-book-thief.png",
    summary: "Narrated by Death, this story follows Liesel, a young girl growing up in Nazi Germany, who finds solace and survival by stealing books and sharing them with others.",
  },
  {
    id: "tr13",
    title: "Meditations",
    author: "Marcus Aurelius",
    coverUrl: "/images/book-covers/meditations.png",
    summary: "The private journal entries of a Roman Emperor, offering timeless Stoic philosophy on self-discipline, duty, resilience, and dealing with adversity.",
  },
  {
    id: "tr14",
    title: "The First Three Minutes",
    author: "Steven Weinberg",
    coverUrl: "/images/book-covers/the-first-three-minutes.png",
    summary: "A detailed look by a Nobel laureate physicist at the modern scientific understanding of what happened during the immediate aftermath of the Big Bang.",
  }
];

export const finished: Book[] = [
  {
    id: "f1",
    title: "The Art of War",
    author: "Sun Tzu",
    coverUrl: "/images/book-covers/the-art-of-war.png",
    summary: "An ancient military treatise offering strategic advice on warfare, conflict resolution, and leadership, emphasizing that the highest victory is defeating the enemy without fighting.",
  },
  {
    id: "f2",
    title: "$100M Leads",
    author: "Alex Hormozi",
    coverUrl: "/images/book-covers/100m-leads.png",
    summary: "A tactical business guide that breaks down actionable acquisition frameworks to help entrepreneurs generate high-volume leads for their companies.",
  },
  {
    id: "f3",
    title: "Tao Te Ching",
    author: "Lao Tzu",
    coverUrl: "/images/book-covers/tao-te-ching.png",
    summary: "An ancient foundational text of Taoism offering poetic insights on living in harmony with the natural flow of the universe through simplicity, patience, and compassion.",
  },
  {
    id: "f4",
    title: "Fooled by Randomness",
    author: "Nassim Nicholas Taleb",
    coverUrl: "/images/book-covers/fooled-by-randomness.png",
    summary: "An investigation into how luck, probability, and random chance are frequently mistaken for skill, intent, and expertise in the financial markets and everyday life.",
  },
  {
    id: "f5",
    title: "Metamorphosis",
    author: "Franz Kafka",
    coverUrl: "/images/book-covers/metamorphosis.png",
    summary: "A surreal novella where a traveling salesman wakes up one morning to find himself inexplicably transformed into a monstrous insect, shifting his family’s dynamic from dependence to disgust.",
  },
  {
    id: "f6",
    title: "The Content Creator Handbook",
    author: "Varun Mayya",
    coverUrl: "/images/book-covers/the-content-creator-handbook.png",
    summary: "A practical roadmap for navigating the modern digital landscape, offering strategies on how to build an audience, master media tools, and monetize digital content.",
  },
  {
    id: "f7",
    title: "Wuthering Heights",
    author: "Emily Brontë",
    coverUrl: "/images/book-covers/wuthering-heights.png",
    summary: "A tempestuous, gothic tale of passion and revenge centered on the intense, destructive love between the orphan Heathcliff and the wealthy Catherine Earnshaw.",
  },
  {
    id: "f8",
    title: "Rework",
    author: "David Heinemeier Hansson and Jason Fried",
    coverUrl: "/images/book-covers/rework.png",
    summary: "A counterintuitive business guide that throws out traditional corporate rules, showing instead how to build a successful company faster and with fewer resources.",
  },
  {
    id: "f9",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    coverUrl: "/images/book-covers/crime-and-punishment.png",
    summary: "An impoverished student murders an unscrupulous pawnbroker to test his theory of superiority, only to be consumed by intense psychological torment and guilt.",
  },
  {
    id: "f10",
    title: "Deep Work",
    author: "Cal Newport",
    coverUrl: "/images/book-covers/deep-work.png",
    summary: "A productivity guide arguing that the ability to focus without distraction on cognitively demanding tasks is a crucial, rare skill in a noisy digital economy.",
  },
  {
    id: "f11",
    title: "Animal Farm",
    author: "George Orwell",
    coverUrl: "/images/book-covers/animal-farm.png",
    summary: "A satirical allegory of the Russian Revolution where farm animals overthrow their human master, only to watch their new society slowly devolve into a brutal dictatorship run by the pigs.",
  },
  {
    id: "f12",
    title: "1984",
    author: "George Orwell",
    coverUrl: "/images/book-covers/1984.png",
    summary: "A chilling dystopian novel following Winston Smith as he attempts to rebel against a totalitarian government led by Big Brother, which controls every action, thought, and truth.",
  },
  {
    id: "f13",
    title: "Children of Time",
    author: "Adrian Tchaikovsky",
    coverUrl: "/images/book-covers/children-of-time.png",
    summary: "An epic sci-fi tale of survival where the remnants of humanity clash with an accelerated, engineered species of intelligent spiders for ownership of a terraformed planet.",
  },
  {
    id: "f14",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    coverUrl: "/images/book-covers/sapiens.png",
    summary: "A sweeping history of humankind that charts how a mediocre ape became the ruler of planet Earth through shared myths like money, religion, and the nation-state.",
  },
  {
    id: "f15",
    title: "Perfume: The Story of a Murderer",
    author: "Patrick Süskind",
    coverUrl: "/images/book-covers/perfume-the-story-of-a-murder.png",
    summary: "Set in 19th-century France, an unloved man born with a sublime sense of smell but no personal body odor becomes obsessed with creating the ultimate scent by murdering young women.",
  },
  {
    id: "f16",
    title: "Doglapan",
    author: "Ashneer Grover",
    coverUrl: "/images/book-covers/doglapan.png",
    summary: "The raw, unfiltered autobiography of the BharatPe co-founder, detailing his highs and lows in the Indian startup ecosystem, corporate warfare, and celebrity life.",
  },
  {
    id: "f17",
    title: "The Order of Time",
    author: "Carlo Rovelli",
    coverUrl: "/images/book-covers/the-order-of-time.png",
    summary: "A poetic, accessible physics book that deconstructs our conventional understanding of time, arguing that it does not flow uniformly and is ultimately an illusion of our perception.",
  },
  {
    id: "f18",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    coverUrl: "/images/book-covers/tmrw-and-tmrw-and-tmrw.png",
    summary: "Spanning thirty years, this novel follows two childhood friends who become superstar video game developers, exploring the complexities of love, creativity, and grief.",
  }
];
