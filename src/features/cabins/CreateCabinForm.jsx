import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import useCreateCabin from './useCreateCabin';
import useEditCabin from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEdit = Boolean(editId);
  // react-hook-form提供的钩子函数，用于管理表单状态和处理表单提交 reset可以直接用于重置表单 这就是hook-form带来的便利之处
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {},
  });
  // 也可以从formState中获取errors
  const { errors } = formState;
  const { createCabin, isCreating } = useCreateCabin();

  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;
  function Submit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    // console.log(data);
    if (isEdit)
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          // 对于创建成功后的处理，不需要通过传递reset到对应的use hook中，可以直接在这里处理
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      ); //image是一个文件列表，我们需要第一个文件;
  }
  // 当出现错误时，handleSubmit会调用Error函数，而不是调用Submit
  function Errors(err) {
    // console.log(err);
  }
  // register是react-hook-form提供的一个函数，用于将表单字段注册到表单中，以便进行验证和数据收集,能自动提供onChange、onBlur等事件处理程序
  // handleSubmit是react-hook-form提供的一个函数，用于处理表单提交事件。它接受一个回调函数作为参数，当表单提交时会调用该回调函数，并传入表单数据。
  return (
    <Form onSubmit={handleSubmit(Submit, Errors)} type={onClose ? 'modal' : 'regular'}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          // register除了提供验证，还提供error
          {...register('name', {
            required: 'this filed is required',
          })}
        />
      </FormRow>
      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'this filed is required',
            min: {
              value: 1,
              message: 'capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'this filed is required',
            // 还可以设置min属性来验证
            min: {
              value: 1,
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          {...register('discount', {
            required: 'this filed is required',
            // 还可以使用validate来进行自定义验证
            validate: value => value <= getValues('regularPrice') || 'discount should be less than regular price',
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isWorking}
          {...register('description', {
            required: 'this filed is required',
          })}
          defaultValue=''
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        {/* 如何传送图片，可以通过style component来定义 */}
        <FileInput
          id='image'
          accept='image/*'
          disabled={isWorking}
          {...register('image', {
            // 如果处在正在编辑状态 那么图片是不允许进行修改的
            required: isEdit ? false : 'this filed is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset' onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEdit ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
