import test from 'ava';
import pathMatching from '..';

test('pathMatching', t => {
  try {
    pathMatching({ ignore: '/api', match: '/dashboard' });
  } catch (e) {
    t.is(e.message, 'options.match and options.ignore can not both present');
  }
});
