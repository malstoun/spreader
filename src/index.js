function getParsedKey(key, variableKeys) {
	if (!variableKeys) {
		return key;
	}

	const match = key.match(/^\[(.+)\]$/)

	if (match && match[1]) {
		if (typeof variableKeys === 'string' ||
			typeof variableKeys === 'number'
		) {
			return ''+variableKeys
		} else {
			return variableKeys[match[1]]
		}
	} else {
		return key
	}
}

export default function spreader(schema) {
	return function(currentState, vals, variableKeys) {
		const nextState = {
			...currentState
		};

		let linkedState = {
			...currentState
		};

		schema.reduce((prevLevel, key, i, arr) => {
			const parsedKey = getParsedKey(key, variableKeys);

			if (i === arr.length - 1) {
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
