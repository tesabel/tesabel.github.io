// 명언 데이터 - 영어 명언과 한국어 해석을 포함
const quotes = [
  {
    text: "The only person you should try to be better than is the person you were yesterday.",
    translation:
      "어제의 나보다 더 나은 사람이 되려고 노력하는 것만이 중요하다.",
    author: "Anonymous",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    translation:
      "성공이 끝이 아니며, 실패가 치명적이지 않다. 계속할 용기가 중요하다.",
    author: "Winston Churchill",
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    translation:
      "시작하기 위해 대단할 필요는 없지만, 대단해지기 위해서는 시작해야 한다.",
    author: "Zig Ziglar",
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    translation:
      "무언가를 위해 열심히 노력할수록, 그것을 이룰 때 더 큰 기쁨을 느낄 것이다.",
    author: "Anonymous",
  },
  {
    text: "The body achieves what the mind believes.",
    translation: "몸은 마음이 믿는 것을 이룬다.",
    author: "Anonymous",
  },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    translation: "피곤할 때 멈추지 말고, 끝냈을 때 멈춰라.",
    author: "Anonymous",
  },
  {
    text: "It's not about having time, it's about making time.",
    translation: "시간이 있는 것이 아니라, 시간을 만드는 것이다.",
    author: "Anonymous",
  },
  {
    text: "Your body can stand almost anything. It's your mind that you have to convince.",
    translation:
      "당신의 몸은 거의 모든 것을 견딜 수 있다. 설득해야 할 것은 당신의 마음이다.",
    author: "David Goggins",
  },
  {
    text: "The difference between the impossible and the possible lies in a person's determination.",
    translation: "불가능과 가능의 차이는 한 사람의 결심에 달려있다.",
    author: "Tommy Lasorda",
  },
  {
    text: "Discipline is choosing between what you want now and what you want most.",
    translation:
      "규율은 지금 원하는 것과 가장 원하는 것 사이에서 선택하는 것이다.",
    author: "Abraham Lincoln",
  },
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    translation: "오늘 느끼는 고통은 내일 느끼게 될 힘이 될 것이다.",
    author: "Anonymous",
  },
  {
    text: "Don't count the days, make the days count.",
    translation: "날짜를 세지 말고, 날마다 의미있게 만들어라.",
    author: "Muhammad Ali",
  },
  {
    text: "Your health is an investment, not an expense.",
    translation: "당신의 건강은 비용이 아닌 투자이다.",
    author: "Anonymous",
  },
  {
    text: "The only bad workout is the one that didn't happen.",
    translation: "유일하게 나쁜 운동은 하지 않은 운동이다.",
    author: "Anonymous",
  },
  {
    text: "Success is what comes after you stop making excuses.",
    translation: "성공은 변명을 그만둔 후에 오는 것이다.",
    author: "Anonymous",
  },
  {
    text: "He who has a why to live can bear almost any how.",
    translation: "살아야 할 이유가 있는 사람은 어떤 상황도 견딜 수 있다.",
    author: "Friedrich Nietzsche",
  },
  {
    text: "That which does not kill us makes us stronger.",
    translation: "우리를 죽이지 않는 것은 우리를 더 강하게 만든다.",
    author: "Friedrich Nietzsche",
  },
  {
    text: "One must still have chaos in oneself to be able to give birth to a dancing star.",
    translation:
      "춤추는 별을 탄생시키기 위해서는 자신 안에 혼돈이 있어야 한다.",
    author: "Friedrich Nietzsche",
  },
  {
    text: "The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.",
    translation:
      "젊은이를 타락시키는 가장 확실한 방법은 다르게 생각하는 사람들보다 같은 생각을 가진 사람들을 더 존중하도록 가르치는 것이다.",
    author: "Friedrich Nietzsche",
  },
  {
    text: "No price is too high to pay for the privilege of owning yourself.",
    translation:
      "자신을 소유하는 특권을 위해서라면 어떤 대가도 너무 높지 않다.",
    author: "Friedrich Nietzsche",
  },
  {
    text: "Without music, life would be a mistake.",
    translation: "음악이 없다면, 인생은 실수였을 것이다.",
    author: "Friedrich Nietzsche",
  },
  {
    text: "The individual has always had to struggle to keep from being overwhelmed by the tribe.",
    translation: "개인은 항상 부족에 압도되지 않기 위해 투쟁해야 했다.",
    author: "Friedrich Nietzsche",
  },
  {
    text: "In individuals, insanity is rare; but in groups, parties, nations and epochs, it is the rule.",
    translation:
      "개인에게 광기는 드물지만, 집단, 정당, 국가, 시대에는 그것이 규칙이다.",
    author: "Friedrich Nietzsche",
  },
  {
    text: "You must be ready to burn yourself in your own flame; how could you rise anew if you have not first become ashes?",
    translation:
      "자신의 불꽃 속에서 스스로를 태울 준비가 되어 있어야 한다. 먼저 재가 되지 않고서 어떻게 새롭게 일어날 수 있겠는가?",
    author: "Friedrich Nietzsche",
  },
  {
    text: "The secret of reaping the greatest fruitfulness and the greatest enjoyment from life is to live dangerously.",
    translation:
      "인생에서 가장 큰 결실과 즐거움을 얻는 비결은 위험하게 사는 것이다.",
    author: "Friedrich Nietzsche",
  },
  {
    text: "Education is the kindling of a flame, not the filling of a vessel.",
    translation: "교육은 그릇을 채우는 것이 아니라, 불꽃을 지피는 것이다.",
    author: "Socrates",
  },
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    translation: "교육의 뿌리는 쓰지만, 그 열매는 달다.",
    author: "Aristotle",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    translation: "멈추지 않는 한, 얼마나 천천히 가는지는 중요하지 않다.",
    author: "Confucius",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    translation:
      "성공이 끝이 아니며, 실패가 치명적이지 않다: 중요한 것은 계속할 용기다.",
    author: "Winston Churchill",
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    translation:
      "당신의 시간은 제한되어 있으니, 다른 사람의 삶을 살며 낭비하지 마라.",
    author: "Steve Jobs",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    translation:
      "나무를 심기 가장 좋은 때는 20년 전이었다. 두 번째로 좋은 때는 지금이다.",
    author: "Chinese Proverb",
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    translation:
      "나는 실패하지 않았다. 단지 작동하지 않는 10,000가지 방법을 발견했을 뿐이다.",
    author: "Thomas A. Edison",
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    translation: "성공은 보통 그것을 찾느라 바쁜 사람들에게 온다.",
    author: "Henry David Thoreau",
  },
  {
    text: "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack of will.",
    translation:
      "성공한 사람과 그렇지 않은 사람의 차이는 힘의 부족이나 지식의 부족이 아니라 의지의 부족이다.",
    author: "Vince Lombardi",
  },
  {
    text: "If you want to live a happy life, tie it to a goal, not to people or things.",
    translation:
      "행복한 삶을 살고 싶다면, 그것을 목표에 묶어라, 사람이나 물건이 아니라.",
    author: "Albert Einstein",
  },
  {
    text: "The mind is not a vessel to be filled, but a fire to be kindled.",
    translation: "마음은 채워질 그릇이 아니라, 불을 지필 불씨다.",
    author: "Plutarch",
  },
  {
    text: "What we know is a drop, what we don't know is an ocean.",
    translation: "우리가 아는 것은 한 방울이요, 모르는 것은 대양이다.",
    author: "Isaac Newton",
  },
  {
    text: "Anyone who stops learning is old, whether at twenty or eighty.",
    translation: "학습을 멈추는 사람은 스무 살이든 여든 살이든 늙은 것이다.",
    author: "Henry Ford",
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    translation:
      "인생에서 가장 큰 영광은 결코 넘어지지 않는 것이 아니라, 넘어질 때마다 일어서는 데에 있다.",
    author: "Nelson Mandela",
  },
  {
    text: "The only way to do great work is to love what you do.",
    translation:
      "위대한 일을 하는 유일한 방법은 자신이 하는 일을 사랑하는 것이다.",
    author: "Steve Jobs",
  },
  {
    text: "It always seems impossible until it's done.",
    translation: "그것은 항상 불가능해 보이지만, 해내고 나면 그렇지 않다.",
    author: "Nelson Mandela",
  },
  {
    text: "Intelligence is the ability to adapt to change.",
    translation: "지능이란 변화에 적응하는 능력이다.",
    author: "Stephen Hawking",
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    translation: "내일 죽을 것처럼 살고, 영원히 살 것처럼 배워라.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
    translation:
      "어제의 나는 똑똑해서 세상을 바꾸고 싶었고, 오늘의 나는 현명해서 나를 바꾸고 있다.",
    author: "Rumi",
  },
  {
    text: "If you can dream it, you can do it.",
    translation: "꿈꿀 수 있다면, 이룰 수 있다.",
    author: "Walt Disney",
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    translation: "당신이 원했던 모든 것은 두려움의 반대편에 있다.",
    author: "George Addair",
  },
  {
    text: "Hardships often prepare ordinary people for an extraordinary destiny.",
    translation: "역경은 종종 평범한 사람들을 비범한 운명을 위해 준비시킨다.",
    author: "C.S. Lewis",
  },
  {
    text: "The question isn't who is going to let me; it's who is going to stop me.",
    translation:
      "문제는 누가 나를 허락할 것인가가 아니라, 누가 나를 막을 것인가이다.",
    author: "Ayn Rand",
  },
  {
    text: "We must all suffer from one of two pains: the pain of discipline or the pain of regret.",
    translation:
      "우리는 모두 두 가지 고통 중 하나를 겪어야 한다: 규율의 고통 또는 후회의 고통.",
    author: "Jim Rohn",
  },
  {
    text: "Do not pray for an easy life, pray for the strength to endure a difficult one.",
    translation:
      "쉬운 삶을 위해 기도하지 말고, 어려운 삶을 견딜 수 있는 힘을 위해 기도하라.",
    author: "Bruce Lee",
  },
  {
    text: "Study the past if you would define the future.",
    translation: "미래를 정의하고 싶다면 과거를 연구하라.",
    author: "Confucius",
  },
  {
    text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    translation:
      "배울 수 있는 능력은 선물이고, 배우는 기술은 능력이며, 배우려는 의지는 선택이다.",
    author: "Brian Herbert",
  },
  {
    text: "The highest result of education is tolerance.",
    translation: "교육의 가장 높은 결과는 관용이다.",
    author: "Helen Keller",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    translation: "어려움 속에 기회가 있다.",
    author: "Albert Einstein",
  },
  {
    text: "You don't learn to walk by following rules. You learn by doing, and by falling over.",
    translation:
      "규칙을 따른다고 걷는 법을 배우지 않는다. 행동하고 넘어짐으로써 배운다.",
    author: "Richard Branson",
  },
  {
    text: "A man's mind, stretched by new ideas, may never return to its original dimensions.",
    translation:
      "새로운 아이디어로 확장된 인간의 마음은 결코 원래의 크기로 돌아갈 수 없다.",
    author: "Oliver Wendell Holmes Jr.",
  },
  {
    text: "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.",
    translation:
      "어제로부터 배우고, 오늘을 위해 살며, 내일을 위해 희망하라. 중요한 것은 질문을 멈추지 않는 것이다.",
    author: "Albert Einstein",
  },
  {
    text: "All our dreams can come true, if we have the courage to pursue them.",
    translation: "모든 꿈은 이루어질 수 있다, 그것을 추구할 용기만 있다면.",
    author: "Walt Disney",
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    translation:
      "더 많이 읽을수록, 더 많은 것을 알게 된다. 더 많이 배울수록, 더 많은 곳에 갈 수 있다.",
    author: "Dr. Seuss",
  },
  {
    text: "Develop a passion for learning. If you do, you will never cease to grow.",
    translation:
      "배움에 대한 열정을 개발하라. 그러면 당신은 결코 성장을 멈추지 않을 것이다.",
    author: "Anthony J. D'Angelo",
  },
  {
    text: "I don't regret the things I've done, I regret the things I didn't do when I had the chance.",
    translation:
      "내가 한 일들을 후회하지 않는다, 기회가 있었을 때 하지 않은 일들을 후회한다.",
    author: "Anonymous",
  },
  {
    text: "Life is 10% what happens to you and 90% how you react to it.",
    translation:
      "인생은 당신에게 일어나는 것이 10%이고, 그것에 당신이 어떻게 반응하는가가 90%이다.",
    author: "Charles R. Swindoll",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    translation: "미래는 자신의 꿈의 아름다움을 믿는 사람들에게 속한다.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Believe you can and you're halfway there.",
    translation: "할 수 있다고 믿으면 절반은 이룬 것이다.",
    author: "Theodore Roosevelt",
  },
];

// 오늘의 명언을 가져오는 함수
function getDailyQuote() {
  // 오늘 날짜를 기반으로 명언 선택
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );

  // 날짜에 따라 일관된 명언 선택 (하루에 하나의 명언)
  const quoteIndex = dayOfYear % quotes.length;

  return quotes[quoteIndex];
}

// 랜덤 명언을 가져오는 함수 (필요시 사용)
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
