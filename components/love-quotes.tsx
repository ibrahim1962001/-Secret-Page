'use client'

import { useState, useEffect } from 'react'
import { Quote, RefreshCw, Heart, Sparkles } from 'lucide-react'

const LOVE_QUOTES = [
  { text: 'أنت أجمل صدفة حصلتلي في حياتي', author: 'قلبي' },
  { text: 'كل يوم بحبك أكتر من اللي فات', author: 'روحي' },
  { text: 'وجودك في حياتي هو أحلى هدية', author: 'أنا' },
  { text: 'معاك حسيت إن الدنيا حلوة', author: 'قلبي' },
  { text: 'أنت مش بس حبيبي، أنت بيتي', author: 'روحي' },
  { text: 'في عينيك لقيت كل اللي كنت بدور عليه', author: 'قلبي' },
  { text: 'الحب مش كلام، الحب أنت', author: 'أنا' },
  { text: 'أنت الأمان اللي كنت محتاجه', author: 'روحي' },
  { text: 'معاك نسيت كل الألم اللي فات', author: 'قلبي' },
  { text: 'أنت أحلى حلم اتحقق', author: 'أنا' },
  { text: 'قلبي مكانه عندك للأبد', author: 'روحي' },
  { text: 'كل ثانية معاك بتساوي عمر', author: 'قلبي' },
  { text: 'أنت النور في عتمة أيامي', author: 'أنا' },
  { text: 'حبك غير حياتي للأحسن', author: 'روحي' },
  { text: 'مفيش كلام يوصف قد إيه بحبك', author: 'قلبي' },
  { text: 'أنت كل حاجة حلوة في الدنيا', author: 'أنا' },
  { text: 'معاك اتعلمت يعني إيه سعادة', author: 'روحي' },
  { text: 'أنت السبب إني بصحى مبسوط', author: 'قلبي' },
  { text: 'حضنك هو المكان الوحيد اللي بحس فيه بالراحة', author: 'أنا' },
  { text: 'أنت مش نص التاني، أنت الكل', author: 'روحي' },
]

export function LoveQuotes() {
  const [currentQuote, setCurrentQuote] = useState(LOVE_QUOTES[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * LOVE_QUOTES.length)
    setCurrentQuote(LOVE_QUOTES[randomIndex])
  }, [])

  const getNewQuote = () => {
    setIsAnimating(true)
    setLiked(false)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * LOVE_QUOTES.length)
      setCurrentQuote(LOVE_QUOTES[randomIndex])
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-10 relative">
        <Quote className="w-5 h-5 text-primary/60" />
        <h2 className="text-2xl font-serif gradient-text">كلام من القلب</h2>
        <Quote className="w-5 h-5 text-primary/60 rotate-180" />
      </div>

      <div className="relative min-h-[180px] flex flex-col items-center justify-center">
        {/* Quote content */}
        <div className={`text-center px-4 md:px-12 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="relative">
            <Sparkles className="absolute -top-6 -right-4 w-5 h-5 text-primary/30" />
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif text-balance">
              &ldquo;{currentQuote.text}&rdquo;
            </p>
            <Sparkles className="absolute -bottom-4 -left-4 w-5 h-5 text-accent/30" />
          </div>
          <p className="text-primary/80 mt-6 text-sm">- {currentQuote.author}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-10">
          <button
            onClick={() => setLiked(!liked)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              liked
                ? 'bg-primary/20 text-primary scale-110'
                : 'bg-muted/50 text-muted-foreground hover:text-primary hover:bg-muted'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={getNewQuote}
            disabled={isAnimating}
            className="bg-muted/50 hover:bg-muted px-6 py-3 rounded-full flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">اقتباس جديد</span>
          </button>
        </div>
      </div>
    </div>
  )
}
