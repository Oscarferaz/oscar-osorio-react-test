
import { Input, Form} from "rsuite";
import styles from './css/FieldForm.module.scss'

interface FieldProps {
    as?: React.ElementType; 
    label: string; 
    error?: React.ReactNode;
    type?: string 
    field: {
        name: string,
        value: string,
        onChange: (value: string | React.ChangeEvent<HTMLInputElement> ) => void 
    }
}
const Field: React.FC<FieldProps> = ({ as: Component = Input, field, label, error,type =  'text', ...rest }) => {
    return (
      <Form.Group className={styles.width}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Component
          id={field.name}
          value={field.value}
          onChange={(value: string) => field.onChange(value)}
          placeholder={label}
          {...rest}
          type={type}
        />
        <Form.ErrorMessage show={!!error} placement="bottomStart">
          {error}
        </Form.ErrorMessage>
      </Form.Group>
    );
};
  
export default Field