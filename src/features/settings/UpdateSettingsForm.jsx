import useSettings from './useSettings';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useEditSettings from './useEditSettings';
function UpdateSettingsForm() {
  // 由于暂时不需要通过按钮 所以就不使用useForm了 ，而是直接通过onBlur进行一个非模糊处理，当更改的信息，鼠标移开输入框时，就进行更新
  const { isLoading, settings } = useSettings();
  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings || {};
  const { editSettings, isEditing, error } = useEditSettings();
  function handleBlur(e, field) {
    const { value } = e.target;
    if (!value) return;
    editSettings({ [field]: value });
  }
  if (isLoading) return <Spinner />;
  // console.log(settings);
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} onBlur={e => handleBlur(e, 'minBookingLength')} disabled={isEditing} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} onBlur={e => handleBlur(e, 'maxBookingLength')} disabled={isEditing} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          onBlur={e => handleBlur(e, 'maxGuestsPerBooking')}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} onBlur={e => handleBlur(e, 'breakfastPrice')} disabled={isEditing} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
