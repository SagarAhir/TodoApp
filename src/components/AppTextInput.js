import {useState} from 'react'
import { Title, Card, Button, TextInput } from 'react-native-paper';
import Spacer from './Spacer'

const AppTextInput = ({title, buttonText, onPress, value}) => {
  const [task, setTask] = useState(value)

  const handleSubmit = () => {
    onPress(task)
    setTask('')
  }

  return (
    <Card>
      <Card.Content>
          <Title>{title}</Title>
          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={task => setTask(task)}
          />
          <Spacer/>
          <Button mode="contained" onPress={handleSubmit} disabled={task?.length === 0}>
            {buttonText}
          </Button>
      </Card.Content>
    </Card>
  )
}

export default AppTextInput