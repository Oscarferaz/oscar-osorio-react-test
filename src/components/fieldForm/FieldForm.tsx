
import { Input, Form} from "rsuite";
import styles from './css/FieldForm.module.scss'

interface FieldProps {
    as?: React.ElementType; 
    label: string; 
    error?: React.ReactNode; 
    field: {
        name: string,
        value: string,
        onChange: (value: string) => void
    }
}
const Field: React.FC<FieldProps> = ({ as: Component = Input, field, label, error, ...rest }) => {
    return (
      <Form.Group className={styles.width}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Component
          id={field.name}
          value={field.value}
          onChange={(value: string) => field.onChange(value)}
          placeholder={label}
          {...rest}
        />
        <Form.ErrorMessage show={!!error} placement="bottomStart">
          {error}
        </Form.ErrorMessage>
      </Form.Group>
    );
};
  
export default Field