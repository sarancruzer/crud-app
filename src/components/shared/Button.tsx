import React from 'react';
import { Button, Table } from 'reactstrap';

export type Props = {
    color?: string;
    isOutline?: boolean;
    btnText: string;
    onClick?: () => void;
}
export const Buttons: React.FC = (props: Props) => {
    const { color, btnText  } = props;
  return (
    <> <div>  <Button color={color} outline > {btnText} </Button> </div></>
  )
}
