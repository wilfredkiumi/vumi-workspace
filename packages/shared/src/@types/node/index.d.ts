// Fix for broken node stream types
declare module 'node:stream' {
  import { EventEmitter } from 'node:events';
  
  export class Stream extends EventEmitter {
    pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean }): T;
  }
  
  export class Readable extends Stream implements NodeJS.ReadableStream {
    readable: boolean;
    read(size?: number): any;
    setEncoding(encoding: BufferEncoding): this;
    pause(): this;
    resume(): this;
    isPaused(): boolean;
    unpipe(destination?: NodeJS.WritableStream): this;
  }
  
  export class Writable extends Stream implements NodeJS.WritableStream {
    writable: boolean;
    write(chunk: any, encoding?: BufferEncoding, callback?: (error?: Error | null) => void): boolean;
    end(callback?: () => void): void;
  }
}

declare module 'node:events' {
  export class EventEmitter {
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    emit(event: string | symbol, ...args: any[]): boolean;
  }
}
