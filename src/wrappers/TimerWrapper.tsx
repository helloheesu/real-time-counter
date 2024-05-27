const className = 'w-full flex flex-col items-center gap-2 p-4';

const TimerWrapper = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => {
  return <div className={`${className} ${classNames}`}>{children}</div>;
};

export default TimerWrapper;
