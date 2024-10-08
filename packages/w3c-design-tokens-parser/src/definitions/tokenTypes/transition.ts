import { Either } from 'effect';
import { Transition } from 'design-tokens-format-module';

import { parseAliasableDurationValue } from './duration.js';
import { parseAliasableCubicBezierValue } from './cubicBezier.js';
import { ValidationError } from '@nclsndr/design-tokens-utils';
import { AnalyzedValue } from '../../parser/token/AnalyzedToken.js';
import { AnalyzerContext } from '../../parser/utils/AnalyzerContext.js';
import { makeParseObject } from '../../parser/utils/parseObject.js';
import { withAlias } from '../internals/withAlias.js';

const parseTransitionRawValue = makeParseObject({
  duration: { parser: parseAliasableDurationValue },
  delay: { parser: parseAliasableDurationValue },
  timingFunction: { parser: parseAliasableCubicBezierValue },
});

export const parseAliasableTransitionValue = withAlias(
  (
    value: unknown,
    ctx: AnalyzerContext,
  ): Either.Either<
    AnalyzedValue<Transition.RawValue>,
    Array<ValidationError>
  > => {
    return parseTransitionRawValue(value, ctx).pipe(
      Either.map((analyzed) => ({
        raw: {
          duration: analyzed.duration.raw,
          delay: analyzed.delay.raw,
          timingFunction: analyzed.timingFunction.raw,
        },
        toReferences: [
          ...analyzed.duration.toReferences,
          ...analyzed.delay.toReferences,
          ...analyzed.timingFunction.toReferences,
        ],
      })),
    );
  },
);
