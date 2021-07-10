import { FC } from 'react';

type Props = {
  text: string;
};

const Hero2Header: FC<Props> = ({ text }): JSX.Element => <h2>{text}</h2>;

export default Hero2Header;
