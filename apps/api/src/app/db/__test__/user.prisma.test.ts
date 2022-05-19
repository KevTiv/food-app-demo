import {data} from '../../assets/fakeUser';
import {findAllUsers, findUser, findUserMetaData, newUser, newUserMetadata} from '../user.prisma';
//First run test on empty database
test('new user and user metadata is correctly created and added to table ', async () => {
    expect(async () => {
        newUser(data.users[0]);
        const { isActive } = await findUser(data.users[0].username);
        expect(isActive).toBe(true);
    });

    expect(async () => {
        newUserMetadata(data.users[0]);
        const {id} = await findUser(data.users[0].username);
        const {city} = await findUserMetaData(id);
        expect(city).toBe("staphorst");
    });

     expect(async () => {
        const users = await findAllUsers()
        expect(users.length).toBeGreaterThan(1);
    });
});