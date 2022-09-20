const { faker } = require('@faker-js/faker');
const Mock = require('mockjs');
const Random = Mock.Random;

function generateUsers() {
  let users = [];

  for (var id = 0; id < 50; id++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();
    const phoneNumber = faker.phone.number();

    users.push({
      id: id,
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
    });
  }

  return users;
}

function generateNews() {
  let news = [];

  let images = [1, 2, 3].map((x) =>
    Random.image('120x60', Random.color(), Random.word(2, 6)),
  );

  for (let i = 1; i <= 100; i++) {
    const content = Random.cparagraph(0, 10);

    news.push({
      id: i,
      title: Random.cword(8, 20),
      desc: content.substr(0, 40),
      tag: Random.cword(2, 6),
      views: Random.integer(100, 5000),
      images: images.slice(0, Random.integer(1, 3)),
    });
  }
  return news;
}

module.exports = () => {
  return {
    users: generateUsers(),
    news: generateNews(),
  };
};
