import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// Интересные факты о котах на русском языке
const catFacts = [
  "Кошки не могут чувствовать сладкий вкус из-за особенностей их генов",
  "Мурлыканье кошек происходит как при вдохе, так и при выдохе",
  "Кошки проводят около 70% своей жизни во сне",
  "У кошек есть доминирующая лапа, как у людей есть ведущая рука",
  "Кошки могут развивать скорость до 49 километров в час",
  "Кошки потеют только через подушечки лап",
  "Кошки могут поворачивать уши на 180 градусов",
  "Нос каждой кошки уникален, как отпечаток пальца у человека",
  "Кошки не могут видеть непосредственно под своим носом",
  "Кошки могут издавать около 100 различных звуков",
  "Кошки тратят около 30% времени бодрствования на умывание",
  "Сердце кошки бьется почти вдвое быстрее человеческого",
  "Кошки не различают красный цвет, для них он выглядит серым",
  "Кошки могут прыгать в высоту в 5-6 раз больше своей длины",
  "У кошек отличная память - они могут помнить события до 10 лет",
  "Мозг кошки более схож с человеческим, чем с собачьим",
  "Кошки видят в темноте в 6 раз лучше людей",
  "Усы кошки помогают определить, пролезет ли она в отверстие",
  "Кошки практически никогда не мяукают друг с другом",
  "Домашние кошки проводят 80% дня в состоянии покоя или сна",
  "У кошек в среднем 12 подвижных усов с каждой стороны мордочки",
  "Кошки не чувствуют вкус воды - они определяют её качество по запаху",
  "Кошки могут пить морскую воду благодаря особым почкам",
  "В Древнем Египте за убийство кошки полагалась смертная казнь",
  "Кошки не любят цитрусовые запахи и избегают их"
];

function App() {
  const [catImage, setCatImage] = useState('');
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getNewContent = async () => {
    setIsLoading(true);
    try {
      // Получаем изображение кота
      const imageResponse = await axios.get('https://api.thecatapi.com/v1/images/search');
      setCatImage(imageResponse.data[0].url);
      
      // Получаем случайный факт из массива
      const randomFact = catFacts[Math.floor(Math.random() * catFacts.length)];
      setFact(randomFact);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getNewContent();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-stone-100 to-zinc-200 background-animate">
      <div className="absolute inset-0 bg-black/[0.02] backdrop-blur-[1px]" />
      
      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Заголовок и кнопка */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-5"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-neutral-800 tracking-tight">
              Котики для настроения
            </h1>
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.97 }}
              onClick={getNewContent}
              disabled={isLoading}
              className="bg-neutral-800/90 hover:bg-neutral-800 transition-colors duration-300 
                       py-3 px-6 text-lg md:text-xl font-medium text-neutral-100 shadow-lg 
                       rounded-full inline-flex items-center space-x-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span>Показать другого котика</span>
            </motion.button>
          </motion.div>

          {/* Основная карточка */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-xl ring-1 ring-black/[0.05]"
          >
            {/* Изображение котика */}
            <AnimatePresence mode="wait">
              {catImage && (
                <motion.div
                  key={catImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative aspect-[4/3] md:aspect-[16/9] rounded-xl overflow-hidden mb-5 shadow-md ring-1 ring-black/[0.05] group"
                >
                  <img
                    src={catImage}
                    alt="Random cat"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ opacity: isLoading ? 0.7 : 1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm">
                      <div className="w-12 h-12 border-3 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Блок с фактом */}
            <motion.div
              key={fact}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-800/[0.03] rounded-lg p-4 text-center"
            >
              <p className="text-sm md:text-base text-neutral-700 italic leading-relaxed">
                "{fact}"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App; 