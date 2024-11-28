from marshmallow import Schema, fields, validate


class PostCreateSchema(Schema):
    title = fields.Str(required=True, validate=validate.Length(min=3))
    content = fields.Str(required=True, validate=validate.Length(min=3))
    thumbnail_id = fields.Int(required=True, validate=validate.Range(min=1))


class PostUpdateSchema(Schema):
    title = fields.Str(validate=validate.Length(min=3))
    content = fields.Str(validate=validate.Length(min=3))
    thumbnail_id = fields.Int(validate=validate.Range(min=1))


class TechnologySectionCreateSchema(Schema):
    header = fields.Str(required=True, validate=validate.Length(min=3))
    content = fields.Str(required=True, validate=validate.Length(min=3))


class TechnologyCreateSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=3))
    sections = fields.List(
        fields.Nested(TechnologySectionCreateSchema),
        required=True,
        validate=validate.Length(min=1),
    )


class LanguageCreateSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=3))
    orms = fields.List(
        fields.Str(validate=validate.Length(min=3)), validate=validate.Length(min=1)
    )
    frameworks = fields.List(
        fields.Str(validate=validate.Length(min=3)), validate=validate.Length(min=1)
    )


class TechnologySectionUpdateSchema(Schema):
    id = fields.Integer(required=True, validate=validate.Range(min=1))
    header = fields.Str(validate=validate.Length(min=3))
    content = fields.Str(validate=validate.Length(min=3))


class TechnologyUpdateSchema(Schema):
    id = fields.Integer(required=True, validate=validate.Range(min=1))
    new_name = fields.Str(validate=validate.Length(min=3))
    new_sections = fields.List(
        fields.Nested(TechnologySectionCreateSchema), validate=validate.Length(min=1)
    )
    old_sections = fields.List(
        fields.Nested(TechnologySectionUpdateSchema), validate=validate.Length(min=1)
    )


# this is only used only internnly by LanguageUpdateSchema
class ORMFrameworkUpdateSchema(Schema):
    id = fields.Integer(required=True, validate=validate.Range(min=1))
    name = fields.Str(required=True, validate=validate.Length(min=3))


class LanguageUpdateSchema(Schema):
    id = fields.Integer(required=True, validate=validate.Range(min=1))
    new_name = fields.Str(validate=validate.Length(min=3))
    new_orms = fields.List(
        fields.Str(validate=validate.Length(min=3)), validate=validate.Length(min=1)
    )
    new_frameworks = fields.List(
        fields.Str(validate=validate.Length(min=3)), validate=validate.Length(min=1)
    )
    old_orms = fields.List(
        fields.Nested(ORMFrameworkUpdateSchema), validate=validate.Length(min=1)
    )
    old_frameworks = fields.List(
        fields.Nested(ORMFrameworkUpdateSchema), validate=validate.Length(min=1)
    )


class ORMFrameworkCreateSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=3))


class ProjectVariantLanguageCreateSchema(Schema):
    id = fields.Integer(required=True, validate=validate.Range(min=1))
    frameworks = fields.List(
        fields.Integer(validate=validate.Range(min=1)), validate=validate.Length(min=1)
    )
    orms = fields.List(
        fields.Integer(validate=validate.Range(min=1)), validate=validate.Length(min=1)
    )


class ProjectVariantCreateSchema(Schema):
    link = fields.Str(validate=validate.Length(min=1))
    github = fields.Str(required=True, validate=validate.Length(min=1))
    languages = fields.List(
        fields.Nested(ProjectVariantLanguageCreateSchema),
        required=True,
        validate=validate.Length(min=1),
    )
    technologies = fields.List(
        fields.Integer(), required=True, validate=validate.Length(min=1)
    )


class ProjectCreateSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1))
    description = fields.Str(required=True, validate=validate.Length(min=1))
    problem_statement = fields.Str(required=True, validate=validate.Length(min=1))
    solution = fields.Str(required=True, validate=validate.Length(min=1))
    variants = fields.List(
        fields.Nested(ProjectVariantCreateSchema),
        required=True,
        validate=validate.Length(min=1),
    )


class ProjectVariantUpdateSchema(Schema):
    id = fields.Integer(required=True, validate=validate.Range(min=1))
    link = fields.Str(validate=validate.Length(min=1))
    github = fields.Str(validate=validate.Length(min=1))
    new_languages = fields.List(
        fields.Nested(ProjectVariantLanguageCreateSchema),
        required=True,
        validate=validate.Length(min=1),
    )
    delete_languages = fields.List(fields.Integer(), validate=validate.Length(min=1))
    new_technologies = fields.List(fields.Integer(), validate=validate.Length(min=1))
    delete_technologies = fields.List(fields.Integer(), validate=validate.Length(min=1))


class ProjectUpdateSchema(Schema):
    name = fields.Str(validate=validate.Length(min=1))
    description = fields.Str(validate=validate.Length(min=1))
    problem_statement = fields.Str(validate=validate.Length(min=1))
    solution = fields.Str(validate=validate.Length(min=1))
    new_variants = fields.List(
        fields.Nested(ProjectVariantCreateSchema),
        validate=validate.Length(min=1),
    )
    update_variants = fields.List(
        fields.Nested(ProjectVariantUpdateSchema),
        validate=validate.Length(min=1),
    )
    delete_variants = fields.List(
        fields.Integer(validate=validate.Range(min=1)), validate=validate.Length(min=1)
    )
