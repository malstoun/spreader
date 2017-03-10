[![Build Status](https://travis-ci.org/malstoun/spreadux.svg?branch=master)](https://travis-ci.org/malstoun/spreadux)


# spreadux

Helps to avoid nightmares like this:

```javascript
const entities = {
	...this.state.entities,
	ws: {
		...this.state.entities.users,
		[id]: {
			...this.state.entities.users[id],
			isChanging: isChanging
		}
	}
}
```

## How it works

Consider a typical normalized data.

```javascript
const state = {
	result: [1],
	entities: {
		subjects: {
			1: {
				id: 1,
				title: 'Example',
				path: '/example',
				isActive: true
			}
		}
	}
};
```

We want easily change any fields in any subject. So, `spread helper` will be:

```javascript
const subjectSpread = spreadux(['entities', 'subjects', '[id]']);
```

Now, we can apply that helper to our normalized data:

```javascript
const newState = subjectSpread(state, { isActive: false }, 1);
```

Result:

```javascript
{
	result: [1],
	entities: {
		subjects: {
			1: {
				id: 1,
				title: 'Example',
				path: '/example',
				isActive: false
			}
		}
	}
}
```

## Dependencies

None.
