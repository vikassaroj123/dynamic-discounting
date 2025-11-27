import { Sparkles, TrendingUp, Lightbulb, AlertCircle } from 'lucide-react';
import { Card } from '../Common/Card';
import { useTranslation } from '../../hooks/useTranslation';

interface AIInsightCardProps {
  type: 'suggestion' | 'prediction' | 'recommendation' | 'alert';
  title: string;
  message: string;
  action?: string;
  onAction?: () => void;
  confidence?: number;
}

export function AIInsightCard({ type, title, message, action, onAction, confidence }: AIInsightCardProps) {
  const { t } = useTranslation();
  const icons = {
    suggestion: <Lightbulb className="w-5 h-5" />,
    prediction: <TrendingUp className="w-5 h-5" />,
    recommendation: <Sparkles className="w-5 h-5" />,
    alert: <AlertCircle className="w-5 h-5" />,
  };

  const colors = {
    suggestion: 'from-blue-500 to-blue-600',
    prediction: 'from-purple-500 to-purple-600',
    recommendation: 'from-[#006C35] to-[#004d26]',
    alert: 'from-orange-500 to-orange-600',
  };

  return (
    <Card className="p-5 hover border-l-4 border-l-[#006C35] bg-gradient-to-r from-white to-gray-50/50">
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colors[type]} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
          {icons[type]}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            {confidence && (
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {confidence}% {t('ai.confidence')}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-3">{message}</p>
          {action && onAction && (
            <button
              onClick={onAction}
              className="text-sm font-medium text-[#006C35] hover:text-[#004d26] transition-colors"
            >
              {action} →
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

