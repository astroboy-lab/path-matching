import test from 'ava';
import pathMatching from '..';

test('options.match and options.ignore can not both present', t => {
  try {
    pathMatching({ ignore: '/api', match: '/dashboard' });
  } catch (e) {
    t.is(e.message, 'options.match and options.ignore can not both present');
  }
});

test('options.match and options.ignore both not present should always return true', t => {
  const fn = pathMatching({});
  t.true(fn());
});

test('support string', t => {
  const fn = pathMatching({ match: '/api' });
  t.true(fn({ path: '/api' }));
  t.true(fn({ path: '/api/' }));
  t.true(fn({ path: '/api/hello' }));
  t.false(fn({ path: '/api1' }));
  t.false(fn({ path: '/api1/hello' }));
});

test('support regexp', t => {
  const fn = pathMatching({ match: /^\/api/ });
  t.true(fn({ path: '/api' }));
  t.true(fn({ path: '/api/' }));
  t.true(fn({ path: '/api/hello' }));
  t.true(fn({ path: '/api1' }));
  t.true(fn({ path: '/api1/hello' }));
  t.false(fn({ path: '/hello' }));
});

test('support function', t => {
  const fn = pathMatching({
    match: ctx => ctx.path.startsWith('/api'),
  });
  t.true(fn({ path: '/api' }));
  t.true(fn({ path: '/api/' }));
  t.true(fn({ path: '/api/hello' }));
  t.true(fn({ path: '/api1' }));
  t.true(fn({ path: '/api1/hello' }));
  t.false(fn({ path: '/hello' }));
});
