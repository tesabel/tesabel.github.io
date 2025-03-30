// 명언 데이터 - 영어 명언과 한국어 해석을 포함
const quotes = [
  {
    text: "The only person you should try to be better than is the person you were yesterday.",
    translation: "어제의 나보다 더 나은 사람이 되려고 노력하는 것만이 중요하다.",
    author: "Anonymous"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    translation: "성공이 끝이 아니며, 실패가 치명적이지 않다. 계속할 용기가 중요하다.",
    author: "Winston Churchill"
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    translation: "시작하기 위해 대단할 필요는 없지만, 대단해지기 위해서는 시작해야 한다.",
    author: "Zig Ziglar"
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    translation: "무언가를 위해 열심히 노력할수록, 그것을 이룰 때 더 큰 기쁨을 느낄 것이다.",
    author: "Anonymous"
  },
  {
    text: "The body achieves what the mind believes.",
    translation: "몸은 마음이 믿는 것을 이룬다.",
    author: "Anonymous"
  },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    translation: "피곤할 때 멈추지 말고, 끝냈을 때 멈춰라.",
    author: "Anonymous"
  },
  {
    text: "It's not about having time, it's about making time.",
    translation: "시간이 있는 것이 아니라, 시간을 만드는 것이다.",
    author: "Anonymous"
  },
  {
    text: "Your body can stand almost anything. It's your mind that you have to convince.",
    translation: "당신의 몸은 거의 모든 것을 견딜 수 있다. 설득해야 할 것은 당신의 마음이다.",
    author: "David Goggins"
  },
  {
    text: "The difference between the impossible and the possible lies in a person's determination.",
    translation: "불가능과 가능의 차이는 한 사람의 결심에 달려있다.",
    author: "Tommy Lasorda"
  },
  {
    text: "Discipline is choosing between what you want now and what you want most.",
    translation: "규율은 지금 원하는 것과 가장 원하는 것 사이에서 선택하는 것이다.",
    author: "Abraham Lincoln"
  },
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    translation: "오늘 느끼는 고통은 내일 느끼게 될 힘이 될 것이다.",
    author: "Anonymous"
  },
  {
    text: "Don't count the days, make the days count.",
    translation: "날짜를 세지 말고, 날마다 의미있게 만들어라.",
    author: "Muhammad Ali"
  },
  {
    text: "Your health is an investment, not an expense.",
    translation: "당신의 건강은 비용이 아닌 투자이다.",
    author: "Anonymous"
  },
  {
    text: "The only bad workout is the one that didn't happen.",
    translation: "유일하게 나쁜 운동은 하지 않은 운동이다.",
    author: "Anonymous"
  },
  {
    text: "Success is what comes after you stop making excuses.",
    translation: "성공은 변명을 그만둔 후에 오는 것이다.",
    author: "Anonymous"
  }
];

// 오늘의 명언을 가져오는 함수
function getDailyQuote() {
  // 오늘 날짜를 기반으로 명언 선택
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  
  // 날짜에 따라 일관된 명언 선택 (하루에 하나의 명언)
  const quoteIndex = dayOfYear % quotes.length;
  
  return quotes[quoteIndex];
}

// 랜덤 명언을 가져오는 함수 (필요시 사용)
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}