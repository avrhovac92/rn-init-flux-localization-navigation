/**
* Uses redux-persist-migrate package to migrate persistedStore to new shape
* https://github.com/wildlifela/redux-persist-migrate
* Solves errors on app updates, code changes to use new format but in store old format is persisted
* Example: Change app.genders format
* const migration = {
*  1: state => state,
*  2: state => ({ ...state, app: { ...state.app, genders: {male: 'MALE', female: 'FEMALE' } }})
* };
* Note: it always use latest version(biggest version number)
*
*/

const migration = {
  1: state => state
};

export default migration;
