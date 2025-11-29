"use client"

import { useState, useEffect } from "react"
import { X, ArrowLeft } from "lucide-react"

interface QualificationAnswers {
  career_level: string
  english_situation: string
  english_pain_points: string
  motivation: string
  timeline: string
  previous_investment: string
  budget: string
  personalized_plan: string
}

interface AssessmentQualificationFlowProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (answers: QualificationAnswers) => void
  userEmail: string
}

const QUESTIONS = [
  {
    id: "career_level",
    question: "Em qual nível da sua carreira você está hoje?",
    options: [
      "Sênior / Gerência / Direção",
      "Pleno",
      "Júnior",
      "Em transição de carreira",
    ],
  },
  {
    id: "english_situation",
    question: "Qual dessas situações mais representa seu inglês hoje?",
    options: [
      "Consigo me virar, mas travo em reuniões importantes",
      "Leio bem, mas não me expresso com confiança",
      "Falo, mas não tenho clareza e fluidez profissional",
      "Tenho inglês básico e preciso desenvolver rápido",
      "Já sou avançado, mas não comunico como líder global",
    ],
  },
  {
    id: "english_pain_points",
    question: "Em quais momentos o inglês te atrapalha hoje?",
    options: [
      "Reuniões com o exterior",
      "Apresentações / Pitches",
      "Negociação internacional",
      "Escrever e-mails com segurança",
      "Conversas informais com times globais",
      "Nada disso apenas quero evoluir",
    ],
  },
  {
    id: "motivation",
    question: "Por que agora é o momento certo para evoluir seu inglês?",
    options: [
      "Preciso crescer na carreira",
      "Participo de reuniões globais",
      "Perdi uma oportunidade recentemente por causa do idioma",
      "Quero me preparar para uma oportunidade",
      "Quero melhorar comunicação como líder",
    ],
  },
  {
    id: "timeline",
    question: "Em qual prazo você gostaria de atingir fluência profissional?",
    options: [
      "3 meses",
      "6 meses",
      "12 meses",
      "Sem pressa (não é prioridade agora)",
    ],
  },
  {
    id: "previous_investment",
    question: "Você já investiu em cursos de inglês antes?",
    options: [
      "Sim, mas não supriram minha necessidade",
      "Sim, tive avanços, mas parei",
      "Não, será minha primeira vez",
      "Não, e não tenho intenção de investir agora",
    ],
  },
  {
    id: "budget",
    question: "Qual faixa de investimento você considera realista para um programa profissional?",
    options: [
      "Até R$200/mês (busco algo mais básico)",
      "Entre R$300 e R$700/mês",
      "Entre R$701 e R$1.500/mês",
      "Acima de R$1.500/mês (busco resultado rápido e personalizado)",
    ],
  },
  {
    id: "personalized_plan",
    question: "Você gostaria de conhecer um plano personalizado baseado no seu perfil?",
    options: [
      "Sim, quero analisar a proposta",
      "Talvez, dependendo do formato",
      "Não, estou só explorando opções",
    ],
  },
]

export function AssessmentQualificationFlow({
  isOpen,
  onClose,
  onComplete,
  userEmail,
}: AssessmentQualificationFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Partial<QualificationAnswers>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Reset quando modal abre/fecha e controlar scroll do body
  useEffect(() => {
    if (isOpen) {
      // Bloquear scroll do body quando modal está aberto
      // Preservar scroll position para evitar jump
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
      document.body.style.backgroundColor = "#0B1020" // Mesma cor do background da página
      // Garantir que não haja barra branca lateral
      document.documentElement.style.overflow = "hidden"
      document.documentElement.style.backgroundColor = "#0B1020"
    } else {
      // Restaurar scroll quando modal fecha
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      document.body.style.backgroundColor = ""
      document.documentElement.style.overflow = ""
      document.documentElement.style.backgroundColor = ""
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1)
      }
      setCurrentQuestion(0)
      setAnswers({})
      setIsSubmitting(false)
    }

    // Cleanup
    return () => {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      document.body.style.backgroundColor = ""
      document.documentElement.style.overflow = ""
      document.documentElement.style.backgroundColor = ""
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1)
      }
    }
  }, [isOpen])

  const handleOptionSelect = (option: string) => {
    const questionId = QUESTIONS[currentQuestion].id as keyof QualificationAnswers
    const newAnswers = { ...answers, [questionId]: option }
    setAnswers(newAnswers)

    // Avançar automaticamente para próxima pergunta
    if (currentQuestion < QUESTIONS.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setIsTransitioning(false)
      }, 300) // Pequeno delay para feedback visual
    } else {
      // Última pergunta - finalizar
      handleComplete(newAnswers as QualificationAnswers)
    }
  }

  const handleComplete = async (finalAnswers: QualificationAnswers) => {
    setIsSubmitting(true)
    try {
      await onComplete(finalAnswers)
    } catch (error) {
      console.error("Error completing qualification:", error)
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (!isOpen) return null

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100
  const currentQuestionData = QUESTIONS[currentQuestion]
  const currentAnswer = answers[currentQuestionData.id as keyof QualificationAnswers]

  return (
    <div className="fixed inset-0 z-[100] bg-[#050817]">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] rounded-full bg-[#6366F1]/10 blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] rounded-full bg-[#a3ff3c]/10 blur-[180px]" />
      </div>

      {/* Content */}
      <div
        className="relative z-[101] flex h-full flex-col overflow-hidden"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Header */}
        <div className="border-b border-white/10 px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-10 flex-shrink-0 bg-gradient-to-b from-white/5 to-transparent">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#a3ff3c] mb-2 sm:mb-3">
              Quase lá
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-relaxed mb-6 sm:mb-8">
              Para uma experiência ainda mais direcionada a você, precisamos que responda 8 perguntas rápidas.
            </h2>

            {/* Progress bar */}
            <div>
              <div className="h-1.5 sm:h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#a3ff3c] transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-xs sm:text-sm text-slate-400 text-right">
                Pergunta {currentQuestion + 1} de {QUESTIONS.length}
              </div>
            </div>
          </div>
        </div>

        {/* Question content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16" style={{ WebkitOverflowScrolling: "touch" }}>
          <div className="max-w-4xl mx-auto">
            <div className={`mb-6 sm:mb-8 md:mb-10 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {currentQuestionData.question}
              </h3>
            </div>

            {/* Options */}
            <div className={`space-y-3 sm:space-y-4 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
              {currentQuestionData.options.map((option, index) => {
                const isSelected = currentAnswer === option
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isSubmitting || isTransitioning}
                    className={`w-full text-left p-5 sm:p-6 md:p-7 rounded-2xl border-2 transition-all duration-200 touch-manipulation active:scale-[0.98] ${
                      isSelected
                        ? "border-[#a3ff3c] bg-[#a3ff3c]/10 text-white shadow-lg shadow-[#a3ff3c]/20"
                        : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 active:border-[#a3ff3c]/50 active:bg-white/10"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{ minHeight: "64px" }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-base sm:text-lg md:text-xl font-medium leading-relaxed flex-1">{option}</span>
                      {isSelected && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-[#a3ff3c] flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-[#0B1020]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Back button */}
            {currentQuestion > 0 && (
              <div className="mt-8 sm:mt-10">
                <button
                  onClick={handleBack}
                  disabled={isSubmitting || isTransitioning}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-medium text-slate-400 hover:text-white active:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                  style={{ minHeight: "44px" }}
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  Voltar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Loading overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0B1020]/95 z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#a3ff3c] mb-4" />
              <p className="text-white font-medium text-lg">Finalizando...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
