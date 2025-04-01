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
  // 추가할 명언들
  {
    text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    translation:
      "위대한 일을 하는 유일한 방법은 자신이 하는 일을 사랑하는 것이다. 아직 찾지 못했다면, 계속 찾아라. 타협하지 마라.",
    author: "Steve Jobs",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    translation:
      "당신이 있는 곳에서 시작하라. 가진 것을 활용하라. 할 수 있는 일을 하라.",
    author: "Arthur Ashe",
  },
  {
    text: "Your big opportunity may be right where you are now.",
    translation: "당신의 큰 기회는 지금 당신이 있는 바로 그곳에 있을 수 있다.",
    author: "Napoleon Hill",
  },
  {
    text: "Life begins at the end of your comfort zone.",
    translation: "인생은 당신의 편안함이 끝나는 곳에서 시작된다.",
    author: "Neale Donald Walsch",
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    translation:
      "동기는 당신을 시작하게 하는 것이고, 습관은 당신을 계속 가게 하는 것이다.",
    author: "Jim Ryun",
  },
  {
    text: "If you're going through hell, keep going.",
    translation: "지옥을 지나고 있다면, 계속 가라.",
    author: "Winston Churchill",
  },
  {
    text: "Small daily improvements are the key to staggering long-term results.",
    translation: "매일의 작은 개선이 놀라운 장기적 결과의 열쇠이다.",
    author: "Anonymous",
  },
  {
    text: "The harder I work, the luckier I get.",
    translation: "더 열심히 일할수록, 더 운이 좋아진다.",
    author: "Gary Player",
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    translation:
      "다른 목표를 세우거나 새로운 꿈을 꾸기에 너무 늙은 나이는 없다.",
    author: "C.S. Lewis",
  },
  {
    text: "Action is the foundational key to all success.",
    translation: "행동은 모든 성공의 기초가 되는 열쇠이다.",
    author: "Pablo Picasso",
  },
  {
    text: "Don't wait for opportunity. Create it.",
    translation: "기회를 기다리지 마라. 창조하라.",
    author: "Anonymous",
  },
  {
    text: "The secret of getting ahead is getting started.",
    translation: "앞서 나가는 비결은 시작하는 것이다.",
    author: "Mark Twain",
  },
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    translation: "내일을 실현하는 데 유일한 한계는 오늘의 의심이다.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "Wake up with determination. Go to bed with satisfaction.",
    translation: "결심으로 일어나고, 만족으로 잠자리에 들어라.",
    author: "Anonymous",
  },
  {
    text: "The difference between ordinary and extraordinary is that little extra.",
    translation: "평범함과 비범함의 차이는 그 작은 '추가'에 있다.",
    author: "Jimmy Johnson",
  },
  {
    text: "What you do today can improve all your tomorrows.",
    translation: "오늘 당신이 하는 일이 모든 내일을 개선할 수 있다.",
    author: "Ralph Marston",
  },
  {
    text: "The key to success is to focus on goals, not obstacles.",
    translation: "성공의 열쇠는 장애물이 아닌 목표에 집중하는 것이다.",
    author: "Anonymous",
  },
  {
    text: "Dreams don't work unless you do.",
    translation: "꿈은 당신이 행동하지 않으면 이루어지지 않는다.",
    author: "John C. Maxwell",
  },
  {
    text: "The pain of discipline is far less than the pain of regret.",
    translation: "규율의 고통은 후회의 고통보다 훨씬 적다.",
    author: "Anonymous",
  },
  {
    text: "Every accomplishment starts with the decision to try.",
    translation: "모든 성취는 시도하기로 결정하는 것에서 시작된다.",
    author: "Anonymous",
  },
  {
    text: "Success is not in what you have, but who you are.",
    translation: "성공은 당신이 가진 것이 아니라, 당신이 누구인가에 있다.",
    author: "Bo Bennett",
  },
  {
    text: "Fall seven times, stand up eight.",
    translation: "일곱 번 넘어져도, 여덟 번 일어나라.",
    author: "Japanese Proverb",
  },
  {
    text: "Your attitude determines your direction.",
    translation: "당신의 태도가 당신의 방향을 결정한다.",
    author: "Anonymous",
  },
  {
    text: "Challenge yourself, it's the only path which leads to growth.",
    translation: "자신에게 도전하라, 그것만이 성장으로 이어지는 유일한 길이다.",
    author: "Morgan Freeman",
  },
  {
    text: "The man who moves a mountain begins by carrying away small stones.",
    translation: "산을 옮기는 사람은 작은 돌을 나르는 것으로 시작한다.",
    author: "Confucius",
  },
  {
    text: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
    translation:
      "비관주의자는 모든 기회에서 어려움을 보고, 낙관주의자는 모든 어려움에서 기회를 본다.",
    author: "Winston Churchill",
  },
  {
    text: "When you feel like quitting, remember why you started.",
    translation: "포기하고 싶을 때, 왜 시작했는지 기억하라.",
    author: "Anonymous",
  },
  {
    text: "You don't have to be extreme, just consistent.",
    translation: "극단적일 필요는 없다, 단지 일관성 있으면 된다.",
    author: "Anonymous",
  },
  {
    text: "Don't wish it were easier. Wish you were better.",
    translation: "더 쉽기를 바라지 말고, 당신이 더 나아지기를 바라라.",
    author: "Jim Rohn",
  },
  {
    text: "You are the master of your destiny. You can influence, direct and control your own environment.",
    translation:
      "당신은 자신의 운명의 주인이다. 당신은 자신의 환경을 영향력 있게 하고, 지시하고, 통제할 수 있다.",
    author: "Napoleon Hill",
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    translation:
      "인생은 우리에게 일어나는 일이 10%이고, 우리가 그것에 어떻게 반응하는가가 90%이다.",
    author: "Charles R. Swindoll",
  },
  {
    text: "If it is important to you, you will find a way. If not, you'll find an excuse.",
    translation:
      "당신에게 중요하다면, 방법을 찾을 것이다. 그렇지 않다면, 변명을 찾을 것이다.",
    author: "Anonymous",
  },
  {
    text: "The best way to predict the future is to create it.",
    translation: "미래를 예측하는 가장 좋은 방법은 그것을 창조하는 것이다.",
    author: "Abraham Lincoln",
  },
  {
    text: "Great things never came from comfort zones.",
    translation: "위대한 것들은 결코 편안한 구역에서 나오지 않는다.",
    author: "Anonymous",
  },
  {
    text: "It's not the load that breaks you down, it's the way you carry it.",
    translation:
      "당신을 무너뜨리는 것은 짐이 아니라, 그것을 짊어지는 방식이다.",
    author: "Lou Holtz",
  },
  {
    text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    translation: "마음속의 두려움에 휘둘리지 마라. 가슴속의 꿈에 이끌려라.",
    author: "Roy T. Bennett",
  },
  {
    text: "Every morning you have two choices: continue to sleep with your dreams, or wake up and chase them.",
    translation:
      "매일 아침 두 가지 선택이 있다: 꿈과 함께 계속 자거나, 일어나서 그것들을 쫓는 것이다.",
    author: "Anonymous",
  },
  {
    text: "The only way to achieve the impossible is to believe it is possible.",
    translation:
      "불가능을 달성하는 유일한 방법은 그것이 가능하다고 믿는 것이다.",
    author: "Charles Kingsleigh",
  },
  {
    text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
    translation:
      "당신의 과제는 사랑을 찾는 것이 아니라, 단지 당신이 그것에 대해 세운, 당신 안의 모든 장벽을 찾고 발견하는 것이다.",
    author: "Rumi",
  },
  {
    text: "Do one thing every day that scares you.",
    translation: "매일 당신을 두렵게 하는 한 가지 일을 하라.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "What we fear doing most is usually what we most need to do.",
    translation:
      "우리가 가장 두려워하는 일이 보통 우리가 가장 필요로 하는 일이다.",
    author: "Tim Ferriss",
  },
  {
    text: "Failure is simply the opportunity to begin again, this time more intelligently.",
    translation: "실패는 단순히 다시 시작할 기회이다, 이번에는 더 지혜롭게.",
    author: "Henry Ford",
  },
  {
    text: "The struggle you're in today is developing the strength you need for tomorrow.",
    translation: "오늘의 투쟁은 내일을 위해 필요한 힘을 개발하고 있다.",
    author: "Anonymous",
  },
  {
    text: "Don't wait. The time will never be just right.",
    translation: "기다리지 마라. 때는 결코 딱 맞지 않을 것이다.",
    author: "Napoleon Hill",
  },
  {
    text: "Your life does not get better by chance, it gets better by change.",
    translation: "당신의 삶은 우연히 나아지지 않는다, 변화에 의해 나아진다.",
    author: "Jim Rohn",
  },
  {
    text: "The biggest adventure you can take is to live the life of your dreams.",
    translation:
      "당신이 할 수 있는 가장 큰 모험은 당신이 꿈꾸는 삶을 사는 것이다.",
    author: "Oprah Winfrey",
  },
  {
    text: "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.",
    translation:
      "꿈을 이루는 데 시간이 걸린다는 이유로 포기하지 마라. 어차피 시간은 흐를 것이다.",
    author: "Earl Nightingale",
  },
  {
    text: "The future depends on what you do today.",
    translation: "미래는 오늘 당신이 무엇을 하느냐에 달려있다.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Twenty years from now you will be more disappointed by the things you didn't do than by the ones you did do.",
    translation:
      "20년 후에 당신은 했던 일보다 하지 않았던 일들로 인해 더 실망할 것이다.",
    author: "Mark Twain",
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
