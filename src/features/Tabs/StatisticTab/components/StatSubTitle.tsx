import { StatisticSubTitleProps } from '../types';

export const StatisticSubTitle = ({
  text,
  className,
}: StatisticSubTitleProps) => (
  <h2 className={`md:text-xl sm:text-lg font-bold mb-6 ${className}`}>
    {text}
  </h2>
);
