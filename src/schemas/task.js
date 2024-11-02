import z from 'zod'

export const TaskSchema = z.object({
  title: z
    .string(
      { message: 'Debes de agregar un titulo a la tarea.' })
    .min(3,
      { message: 'El titulo debe tener un minimo de 3 caracteres.' })
    .max(50,
      { message: 'El titulo no puede sobrepasar los 50 caracteres.' }),
  description: z
    .string()
    .min(10,
      { message: 'La descripción debe tener un mínimo de 10 caracteres.' })
    .max(255,
      { message: 'La descripción no puede sobrepasar los 255 caracteres.' })
    .optional(),
  createdAt: z.date(),
  limitDate: z
    .date()
    .min(new Date(),
      { message: 'Introduce una fecha válida.' })
    .optional(),
  completed: z.boolean(),
  starred: z.boolean()
})

export function validateTask (object) {
  return TaskSchema.safeParse(object)
}
