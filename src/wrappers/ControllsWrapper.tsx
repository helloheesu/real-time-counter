const className = 'flex gap-4 text-3xl';

const ControllsWrapper = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => {
  return <div className={`${className} ${classNames}`}>{children}</div>;
};

export default ControllsWrapper;
