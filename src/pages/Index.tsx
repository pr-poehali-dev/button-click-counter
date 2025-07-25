import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [hasClicked, setHasClicked] = useState(false);
  const [userClickNumber, setUserClickNumber] = useState<number | null>(null);
  const [totalClicks, setTotalClicks] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Проверяем localStorage на наличие клика пользователя
    const userHasClicked = localStorage.getItem('hasClickedButton');
    const userNumber = localStorage.getItem('userClickNumber');
    const savedTotalClicks = localStorage.getItem('totalClicks');

    if (userHasClicked) {
      setHasClicked(true);
      setUserClickNumber(parseInt(userNumber || '0'));
    }

    setTotalClicks(parseInt(savedTotalClicks || '0'));
  }, []);

  const handleClick = () => {
    if (hasClicked) return;

    setIsAnimating(true);
    
    setTimeout(() => {
      const newTotalClicks = totalClicks + 1;
      const newUserNumber = newTotalClicks;

      setHasClicked(true);
      setUserClickNumber(newUserNumber);
      setTotalClicks(newTotalClicks);

      // Сохраняем в localStorage
      localStorage.setItem('hasClickedButton', 'true');
      localStorage.setItem('userClickNumber', newUserNumber.toString());
      localStorage.setItem('totalClicks', newTotalClicks.toString());
      
      setIsAnimating(false);
    }, 800);
  };

  const getClickDescription = () => {
    if (!hasClicked) return '';
    
    if (userClickNumber === 2) return 'Второй!';
    if (userClickNumber === 3) return 'Третий!';
    return `${userClickNumber}-й`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-96 h-96 shadow-2xl bg-white">
        <CardContent className="p-6 h-full flex flex-col justify-between">
          


          {/* Статистика */}
          <div className="space-y-3">
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-1">
                {totalClicks}
              </div>
              <p className="text-sm text-gray-600">
                Всего нажатий
              </p>
            </div>

            {/* Мини визуализация */}
            <div className="flex justify-center space-x-1">
              {[...Array(Math.min(8, totalClicks))].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-6 bg-gradient-to-t from-teal-400 to-teal-600 rounded-sm"
                  style={{
                    height: `${Math.random() * 12 + 12}px`
                  }}
                />
              ))}
              {totalClicks > 8 && (
                <span className="text-gray-500 text-xs ml-1">+{totalClicks - 8}</span>
              )}
            </div>


          </div>

          {/* Основная кнопка */}
          <div className="flex flex-col items-center space-y-4">
            {!hasClicked ? (
              <Button
                onClick={handleClick}
                disabled={isAnimating}
                className="w-64 h-16 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white border-0 hover:scale-105 transform rounded-lg"
                style={{
                  background: isAnimating 
                    ? 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)' 
                    : ''
                }}
              >
                {isAnimating ? (
                  <div className="flex items-center">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span>Обработка...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Icon name="MousePointer2" size={24} className="mr-3" />
                    <span>НАЖМИ МЕНЯ</span>
                  </div>
                )}
              </Button>
            ) : (
              <div className="w-64 h-16 rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-white shadow-lg">
                <Icon name="Check" size={24} className="mr-3" />
                <span className="text-xl font-bold">Нажато!</span>
              </div>
            )}

            {/* Результат клика */}
            {hasClicked && (
              <div className="text-center animate-fade-in">
                <p className="text-sm text-gray-600">
                  Ты {userClickNumber}-й среди всех
                </p>
              </div>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default Index;