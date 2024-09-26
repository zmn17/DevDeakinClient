import { faker } from "@faker-js/faker";

export const generateTutorialFakeData = () => {
  return Array.from({ length: 4 }, () => ({
    id: faker.number.int(),
    itemName: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    rate: faker.number.int({ min: 1, max: 5 }),
    authorName: faker.person.fullName(),
  }));
};
