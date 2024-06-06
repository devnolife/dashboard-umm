import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'

const navigation = () => {
  return [
    {
      title: 'Pendaftaran',
      icon: AccountPlusOutline,
      path: '/:jenis'
    },
  ];
};

export default navigation;
