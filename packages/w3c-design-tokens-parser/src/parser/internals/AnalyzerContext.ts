import { type JSON } from 'design-tokens-format-module';

export type AnalyzerContext = {
  varName: string;
  path: JSON.ValuePath;
  valuePath?: JSON.ValuePath | undefined;
  nodeKey?: '$type' | '$value' | '$description' | '$extensions';
};
