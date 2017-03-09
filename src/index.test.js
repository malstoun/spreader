import { spreadux } from './index';

describe('all', () => {
	test('should return function', () => {
		expect(typeof spreadux([])).toBe('function');
	});

	let state = null;

	beforeEach(() => {
		state = {
			entities: {
				servers: {
					test: {
						build: 'dev'
					}
				}
			},
			result: {
				data: [1, 2, 3]
			}
		};
	});

	afterEach(() => {
		state = null;
	});

	test('state object doesn\'t mutate', () => {
		const subjectSpread = spreadux(['entities', 'servers', 'test']);

		subjectSpread(state, { build: 'prod' })

		expect(state.entities.servers.test.build).toBe('dev');
	});

	test('work with arrays');
});

describe('plain vars', () => {
	let state = null;

	beforeEach(() => {
		state = {
			entities: {
				servers: {
					test: {
						build: 'dev',

					}
				}
			},
			result: {
				data: [1, 2, 3]
			}
		};
	});

	afterEach(() => {
		state = null;
	});

	test('replace field in object', () => {
		const subjectSpread = spreadux(['entities', 'servers', 'test']);

		expect(state.entities.servers.test.build).toBe('dev');

		expect(subjectSpread(state, { build: 'prod' }).entities.servers.test.build).toBe('prod');
	});

	test('save fields when replacing', () => {
		const subjectSpread = spreadux(['entities', 'servers', 'test']);

		expect(subjectSpread(state, { build: 'prod' })).toEqual({
			entities: {
				servers: {
					test: {
						build: 'prod',

					}
				}
			},
			result: {
				data: [1, 2, 3]
			}
		})
	});
});

describe('object vars', () => {
	let state = null;

	beforeEach(() => {
		state = {
			entities: {
				servers: {
					1: {
						build: 'dev',
						name: 'test'
					}
				}
			},
			result: {
				data: [1, 2, 3]
			}
		};
	});

	afterEach(() => {
		state = null;
	});

	test('replace field in object', () => {
		const subjectSpread = spreadux(['entities', 'servers', '[id]']);

		expect(state.entities.servers[1].build).toBe('dev');

		expect(subjectSpread(state, { build: 'prod' }, { id: 1 }).entities.servers[1].build).toBe('prod');
	});

	test('save fields when replacing', () => {
		const subjectSpread = spreadux(['entities', 'servers', '[id]']);

		expect(subjectSpread(state, { build: 'prod' }, { id: 1 })).toEqual({
			entities: {
				servers: {
					1: {
						build: 'prod',
						name: 'test'
					}
				}
			},
			result: {
				data: [1, 2, 3]
			}
		});
	});

	test('throw if var exist in schema and not presented in call', () => {
		const subjectSpread = spreadux(['entities', 'servers', '[id]']);

		expect(subjectSpread(state, { build: 'prod' })).toThrow();
	});
});
