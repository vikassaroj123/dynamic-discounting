import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-gray-100/50 backdrop-blur-sm ${
        hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' : 'transition-shadow duration-300'
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function KPICard({ title, value, subtitle, icon, trend }: KPICardProps) {
  return (
    <Card className="p-6 hover:border-[#006C35]/20 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#006C35]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2 group-hover:text-[#006C35] transition-colors">{title}</p>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-[#006C35] to-[#004d26] bg-clip-text text-transparent mb-1">{value}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center space-x-1">
              <span
                className={`text-xs font-semibold ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className="w-14 h-14 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          {icon}
        </div>
      </div>
    </Card>
  );
}
