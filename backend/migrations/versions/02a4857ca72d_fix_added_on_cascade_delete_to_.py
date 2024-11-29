"""fix: Added on cascade delete to technology_sections

Revision ID: 02a4857ca72d
Revises: 1e65697da5ac
Create Date: 2024-11-12 18:45:35.141273

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '02a4857ca72d'
down_revision = '1e65697da5ac'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('technology_sections', schema=None) as batch_op:
        batch_op.drop_constraint('technology_sections_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'technologies', ['technology_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('technology_sections', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('technology_sections_ibfk_1', 'technologies', ['technology_id'], ['id'])

    # ### end Alembic commands ###