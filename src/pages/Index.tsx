import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    
    if (userClickNumber === 1) return 'Первый!';
    if (userClickNumber === 2) return 'Второй!';
    if (userClickNumber === 3) return 'Третий!';
    return `${userClickNumber}-й`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      {/* Заголовок */}
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Клик Счетчик
        </h1>
        <p className="text-xl text-gray-600 font-medium">
          Нажми кнопку только один раз и узнай свой номер среди всех кликеров
        </p>
      </div>

      {/* Основная кнопка */}
      <div className="mb-12 relative">
        {!hasClicked ? (
          <Button
            onClick={handleClick}
            disabled={isAnimating}
            className="w-64 h-64 rounded-full text-3xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white border-0 hover:scale-105 transform"
            style={{
              background: isAnimating 
                ? 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)' 
                : ''
            }}
          >
            {isAnimating ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                <span className="text-lg">Обработка...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Icon name="MousePointer2" size={48} className="mb-2" />
                <span>НАЖМИ МЕНЯ</span>
              </div>
            )}
          </Button>
        ) : (
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex flex-col items-center justify-center text-white shadow-lg">
            <Icon name="Check" size={48} className="mb-2" />
            <span className="text-2xl font-bold">Нажато!</span>
            <span className="text-lg">Спасибо!</span>
          </div>
        )}
      </div>

      {/* Результат клика */}
      {hasClicked && (
        <Card className="w-full max-w-md mb-8 animate-fade-in shadow-lg">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Твой результат
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <Badge 
                variant="secondary" 
                className="text-2xl px-6 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white font-bold"
              >
                {getClickDescription()}
              </Badge>
              <p className="text-lg text-gray-600">
                Ты нажал кнопку {userClickNumber}-м среди всех пользователей
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Статистика */}
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-2xl font-bold text-gray-900">
            <Icon name="BarChart3" className="mr-3" size={28} />
            Статистика нажатий
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Общее количество */}
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-500 mb-2">
              {totalClicks}
            </div>
            <p className="text-xl text-gray-600">
              Всего нажатий
            </p>
          </div>

          {/* Визуализация */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Активность:</span>
              <div className="flex space-x-1">
                {[...Array(Math.min(10, totalClicks))].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-8 bg-gradient-to-t from-teal-400 to-teal-600 rounded-sm"
                    style={{
                      height: `${Math.random() * 20 + 20}px`
                    }}
                  />
                ))}
                {totalClicks > 10 && (
                  <span className="text-gray-500 ml-2">+{totalClicks - 10}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Icon name="Users" size={24} className="mx-auto mb-2 text-gray-600" />
                <div className="text-2xl font-bold text-gray-900">{totalClicks}</div>
                <div className="text-sm text-gray-600">Участников</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Icon name="TrendingUp" size={24} className="mx-auto mb-2 text-gray-600" />
                <div className="text-2xl font-bold text-green-600">
                  {hasClicked ? '+1' : '0'}
                </div>
                <div className="text-sm text-gray-600">Твой вклад</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Футер */}
      <div className="mt-12 text-center text-gray-500">
        <p className="text-sm">
          🚀 Создано на poehali.dev
        </p>
      </div>
    </div>
  );
};

export default Index;