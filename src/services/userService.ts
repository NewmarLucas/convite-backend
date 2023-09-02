import { User } from '../models/userModel';

interface IUser {
  name: string;
  cellphone: string;
  confirmation: boolean;
  companions: {
    name: string;
    confirmation: boolean;
  }[];
}

function hasAllFields(data: any): boolean {
  let hasAllFields = true;
  const requiredFields = ['name', 'cellphone', 'companions'];
  requiredFields.forEach((item) => {
    if (!(item in data)) {
      hasAllFields = false;
    }
  });
  return hasAllFields;
}

async function createUser(payload: any) {
  const isValid = hasAllFields(payload);
  if (!isValid) {
    return 'invalid payload';
  }

  if (payload?.companions?.length) {
    payload.companions = payload?.companions.map((item: { name: string }) => ({
      ...item,
      confirmation: false,
    }));
  }

  return (await User.create({ ...payload, confirmation: false })) as IUser;
}

async function getUsers() {
  const users = await User.find();
  return (
    users?.map((user) => ({
      id: user._id,
      name: user.name,
      cellphone: user.cellphone,
      confirmation: user.confirmation,
      companions: user.companions,
    })) ?? []
  );
}

async function getUser(id: string) {
  try {
    const userData = await User.findById(id);
    if (!userData) return null;

    return {
      id: userData._id,
      name: userData.name,
      cellphone: userData.cellphone,
      confirmation: userData.confirmation,
      companions: userData.companions,
    };
  } catch (error) {
    return null;
  }
}

async function handleConfirmate(id: string, data: any) {
  try {
    const user = await User.findById(id);
    if (!user) return 'user not found';

    const isValid = hasAllFields(data);
    if (!isValid) return 'invalid payload';

    const payload: IUser = {
      name: user?.name ?? data.name,
      cellphone: user?.cellphone ?? data.cellphone,
      confirmation: data.confirmation ?? false,
      companions: data?.companions.map(
        (item: { name: string; confirmation: boolean }) => ({
          ...item,
          confirmation: item.confirmation ?? false,
        })
      ),
    };
    await User.findByIdAndUpdate(id, payload);

    return await User.findById(id);
  } catch (error) {
    return 'user not found';
  }
}

async function getConfirmationData() {
  let confirmated = 0;
  let notConfirmated = 0;

  const users = await User.find();
  users.forEach((user) => {
    if (user?.confirmation) {
      confirmated++;
    } else {
      notConfirmated++;
    }

    if (user?.companions?.length) {
      user.companions.forEach(
        (companion: { name: string; confirmation: boolean }) => {
          if (companion.confirmation) {
            confirmated++;
          } else {
            notConfirmated++;
          }
        }
      );
    }
  });

  return { confirmated, notConfirmated };
}

export { createUser, getUsers, getUser, handleConfirmate, getConfirmationData };
