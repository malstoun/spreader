function getParsedKey(key, variableKeys) {
	if (!variableKeys) {
		return key;
	}

	const match = key.match(/^\[(.+)\]$/)

	if (match && match[1]) {
		if (typeof variableKeys === 'string' ||
			typeof variableKeys === 'number'
		) {
			return variableKeys.toString()
		} else {
			if (variableKeys[match[1]] !== undefined) {
				return variableKeys[match[1]]
			} else {
				throw Error(`There is no replacement for ${match[1]} in variableKeys. Check the third argument.`)
			}
			return variableKeys[match[1]]
		}
	} else {
		return key
	}
}

export function spreadux(schema) {
	return function(currentState, vals, variableKeys) {
		const nextState = {
			...currentState
		};

		let linkedState = {
			...currentState
		};

		const length = schema.length - 1;

		schema.reduce((prevLevel, key, i) => {
			const parsedKey = getParsedKey(key, variableKeys);

			if (i === length) {
				prevLevel[parsedKey] = {
					...linkedState[parsedKey],
					...vals
				};
			} else {
				prevLevel[parsedKey] = {
					...linkedState[parsedKey]
				};
				linkedState = prevLevel[parsedKey];
			}

			return prevLevel[parsedKey];
		}, nextState);

		return nextState;
	}
}
