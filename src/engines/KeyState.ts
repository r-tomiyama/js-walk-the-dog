export class KeyState {
  private pressedKeys: Map<string, KeyboardEvent>;

  constructor() {
    this.pressedKeys = new Map();
  }

  public isPressed(code: string): boolean {
    return this.pressedKeys.has(code);
  }

  public setPressed(code: string, event: KeyboardEvent): void {
    this.pressedKeys.set(code, event);
  }

  public setReleased(code: string): void {
    this.pressedKeys.delete(code);
  }
}
