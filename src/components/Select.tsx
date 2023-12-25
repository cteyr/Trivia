


const Select = ({clasname,value, handleInputChange}:IProps) => {
    return(
        <select className={clasname} onChange={handleInputChange} value={value}>
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    )
}

type IProps = {
    clasname?: string;
    value?: string;
    handleInputChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  };

export {Select}