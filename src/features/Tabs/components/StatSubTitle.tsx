type StatisticSubTitleProps = {
  className?: string;
  text: string;
};

export const StatisticSubTitle = ({
  className,
  text,
}: StatisticSubTitleProps) => (
  <h2 className={`md:text-xl sm:text-lg font-bold mb-6 ${className}`}>
    {text}
  </h2>
);
