// Allow omitting params typed as undefined
// https://github.com/Microsoft/TypeScript/issues/12400
type ActionOptionalSpread<P, M> = P extends undefined
  ? M extends undefined
    ? [] // It doesn't expect any parameters if both, P and M, are undefined
    : [P, M] // If P is undefined, but M is not, we still have to pass both
  : M extends undefined
  ? [P] // P is not undefined, but M is. which means we expect only P
  : [P, M] // Both, P and M, are not undefined, which means we expect both

export const prefix = 'flux-action-class:'

export abstract class ActionStandard<Payload = undefined, Meta = undefined> {
  protected static readonly _prefix: string = prefix
  public static get type() {
    return `${this._prefix}${this.name}`
  }
  public readonly payload: Payload
  public readonly meta: Meta
  public readonly error: boolean

  constructor(...args: ActionOptionalSpread<Payload, Meta>) {
    const payload = args[0] as Payload
    const meta = args[1] as Meta

    this.payload = payload
    this.meta = meta
    this.error = payload instanceof Error
  }

  public get type(): string {
    // https://github.com/Microsoft/TypeScript/issues/3841
    return ((this.constructor as any) as ActionStandard).type
  }
}
