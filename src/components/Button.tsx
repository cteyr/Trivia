
const Button = ({clasname,text,onClick}:IProps) => {
    return (
        <button className={clasname} onClick={onClick}>{text}</button>
    );
}

type IProps = {
    onClick?: () => void;
    icon?: any;
    text?: string;
    clasname?: string;
  };

export {Button}
