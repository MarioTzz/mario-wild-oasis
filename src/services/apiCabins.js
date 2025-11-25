import supabase from './supabase';
import { supabaseUrl } from './supabase';
export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins data load failed');
  }
  return data;
}
export async function createAndEditCabin(newCabin, id) {
  // 查看是否传入了新的图片 如果没有传入新的图片 那么url就是带有supabase的 则hasImagePath=true 反之 就是传入了新图片 那么hasImagePath=fasle，则需要进行更新
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://odhgosobkjnooprhttbs.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // 需要newCabin中的image进行修改，修改成上传后的路径
  let query = supabase.from('cabins');
  // 1 Create Cabin Edit Cabin

  // A Create 如果没有传入id 那么说明是需要进行插入新的cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]).select();

  // B Edit 如果传入了id 那么说明就是需要进行更新
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error('Cabins data create failed');
  }

  if (hasImagePath) return data; // 如果是已有图片路径 说明不需要上传图片 直接返回
  // 2 Upload Image to Supabase Storage , from是数据库中storage的名称，upload当中则是文件名和文件本身
  const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

  // 3 Delete Cabin if Image upload fails
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('Cabin image upload failed and cabin creation rolled back');
  }
  return data;
}
export async function deleteCabins(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabins data delete failed');
  }
  return data;
}
